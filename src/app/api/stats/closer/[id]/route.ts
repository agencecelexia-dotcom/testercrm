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
            prospects: true,
          },
        },
      },
    })

    if (!closer) {
      return NextResponse.json({ error: "Closer introuvable" }, { status: 404 })
    }

    const clientsApportes = closer.clients.length

    const allProspects = closer.clients.flatMap((c) => c.prospects)

    // CA total des clients du closer
    const caTotalClients = allProspects.reduce(
      (sum, p) => sum + (p.totalChantier || 0),
      0
    )

    // Revenus Celexia = total commission amounts from those prospects
    const revenusCelexia = allProspects.reduce(
      (sum, p) => sum + (p.commissionAmount || 0),
      0
    )

    // Closer commission = 10% of Celexia revenue from their clients
    const maCommission = revenusCelexia * 0.10

    return NextResponse.json({
      clientsApportes,
      caTotalClients,
      revenusCelexia,
      maCommission,
    })
  } catch (error) {
    console.error("GET /api/stats/closer/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
