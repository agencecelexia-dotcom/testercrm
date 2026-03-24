import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = params

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            closer: {
              include: {
                user: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
      },
    })

    if (!invoice) {
      return NextResponse.json({ error: "Facture introuvable" }, { status: 404 })
    }

    // Role-based access
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile || clientProfile.id !== invoice.clientId) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || invoice.client.closerId !== closerProfile.id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    return NextResponse.json(invoice)
  } catch (error) {
    console.error("GET /api/invoices/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    if (session.user.role !== "AGENCE") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    const { id } = params
    const body = await request.json()
    const { status, pdfUrl } = body

    const existing = await prisma.invoice.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Facture introuvable" }, { status: 404 })
    }

    const validStatuses = ["PENDING", "SENT", "PAID", "OVERDUE"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Statut invalide. Valeurs acceptees: ${validStatuses.join(", ")}` },
        { status: 400 }
      )
    }

    const updated = await prisma.invoice.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(pdfUrl !== undefined && { pdfUrl }),
      },
      include: {
        client: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PATCH /api/invoices/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
