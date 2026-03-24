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

    // CLOSER can only view their own stats
    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || closerProfile.id !== id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    if (session.user.role === "CLIENT") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    const closer = await prisma.closerProfile.findUnique({
      where: { id },
      include: {
        clients: {
          include: {
            user: { select: { name: true } },
            prospects: true,
          },
        },
      },
    })

    if (!closer) {
      return NextResponse.json({ error: "Closer introuvable" }, { status: 404 })
    }

    const allProspects = closer.clients.flatMap((c) => c.prospects)

    const clientsApportes = closer.clients.length
    const totalCalls = allProspects.length
    const qualified = allProspects.filter((p) => p.isQualified === true).length
    const devisSent = allProspects.filter((p) => p.devisSent).length
    const won = allProspects.filter((p) =>
      ["ACOMPTE_RECU", "SOLDE_RECU", "TERMINE"].includes(p.status)
    ).length

    const caTotalClients = allProspects.reduce(
      (sum, p) => sum + (p.totalChantier || 0),
      0
    )
    const revenusCelexia = allProspects.reduce(
      (sum, p) => sum + (p.commissionAmount || 0),
      0
    )
    const closerCommission = revenusCelexia * 0.10

    // Per-client breakdown
    const perClient = closer.clients.map((client) => {
      const clientProspects = client.prospects
      const clientCa = clientProspects.reduce(
        (sum, p) => sum + (p.totalChantier || 0),
        0
      )
      const clientCommission = clientProspects.reduce(
        (sum, p) => sum + (p.commissionAmount || 0),
        0
      )
      return {
        clientId: client.id,
        clientName: client.user.name,
        businessName: client.businessName,
        totalProspects: clientProspects.length,
        ca: clientCa,
        commissionCelexia: clientCommission,
        closerCommission: clientCommission * 0.10,
      }
    })

    return NextResponse.json({
      clientsApportes,
      totalCalls,
      qualified,
      devisSent,
      won,
      caTotalClients,
      revenusCelexia,
      closerCommission,
      perClient,
    })
  } catch (error) {
    console.error("GET /api/closers/[id]/stats error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
