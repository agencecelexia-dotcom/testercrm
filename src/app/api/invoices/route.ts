import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")
    const status = searchParams.get("status")
    const month = searchParams.get("month")
    const year = searchParams.get("year")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const where: Prisma.InvoiceWhereInput = {}

    // Role-based filtering
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile) {
        return NextResponse.json({ error: "Profil client introuvable" }, { status: 404 })
      }
      where.clientId = clientProfile.id
    } else if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
        include: { clients: { select: { id: true } } },
      })
      if (!closerProfile) {
        return NextResponse.json({ error: "Profil closer introuvable" }, { status: 404 })
      }
      where.clientId = { in: closerProfile.clients.map((c) => c.id) }
    }

    if (clientId) where.clientId = clientId
    if (status) where.status = status as Prisma.EnumInvoiceStatusFilter
    if (month) where.month = parseInt(month)
    if (year) where.year = parseInt(year)

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: {
          client: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
        orderBy: [{ year: "desc" }, { month: "desc" }],
        skip,
        take: limit,
      }),
      prisma.invoice.count({ where }),
    ])

    return NextResponse.json({
      data: invoices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("GET /api/invoices error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    if (session.user.role !== "AGENCE") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    const body = await request.json()
    const { clientId, month, year, totalRevenue, commission, pdfUrl } = body

    if (!clientId || !month || !year || totalRevenue === undefined || commission === undefined) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: clientId, month, year, totalRevenue, commission" },
        { status: 400 }
      )
    }

    const client = await prisma.clientProfile.findUnique({
      where: { id: clientId },
    })

    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    // Check for duplicate invoice
    const existingInvoice = await prisma.invoice.findFirst({
      where: { clientId, month, year },
    })

    if (existingInvoice) {
      return NextResponse.json(
        { error: "Une facture existe deja pour ce client et ce mois" },
        { status: 409 }
      )
    }

    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        month,
        year,
        totalRevenue,
        commission,
        pdfUrl: pdfUrl || null,
      },
      include: {
        client: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    console.error("POST /api/invoices error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
