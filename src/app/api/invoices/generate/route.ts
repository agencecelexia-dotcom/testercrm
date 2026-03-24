import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

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
    const { clientId, month, year } = body

    if (!clientId || !month || !year) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: clientId, month, year" },
        { status: 400 }
      )
    }

    const client = await prisma.clientProfile.findUnique({
      where: { id: clientId },
      include: {
        user: { select: { name: true, email: true } },
      },
    })

    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    // Check for existing invoice
    const existingInvoice = await prisma.invoice.findFirst({
      where: { clientId, month, year },
    })

    if (existingInvoice) {
      return NextResponse.json(
        { error: "Une facture existe deja pour ce client et ce mois" },
        { status: 409 }
      )
    }

    // Get all completed prospects (TERMINE) for the given month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 1)

    const completedProspects = await prisma.prospect.findMany({
      where: {
        clientId,
        status: "TERMINE",
        callDate: {
          gte: startDate,
          lt: endDate,
        },
      },
    })

    if (completedProspects.length === 0) {
      return NextResponse.json(
        { error: "Aucun prospect termine pour ce mois" },
        { status: 400 }
      )
    }

    // Sum total revenue from completed prospects
    const totalRevenue = completedProspects.reduce(
      (sum, p) => sum + (p.totalChantier || 0),
      0
    )

    // Commission = 10% of totalRevenue
    const commission = totalRevenue * 0.10

    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        month,
        year,
        totalRevenue,
        commission,
      },
      include: {
        client: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    })

    return NextResponse.json(
      {
        invoice,
        summary: {
          prospectsCount: completedProspects.length,
          totalRevenue,
          commission,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/invoices/generate error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
