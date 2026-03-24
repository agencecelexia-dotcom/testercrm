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

    const client = await prisma.clientProfile.findUnique({
      where: { id },
    })

    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    // Role-based access
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile || clientProfile.id !== id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || client.closerId !== closerProfile.id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    const prospects = await prisma.prospect.findMany({
      where: { clientId: id },
    })

    // Investi = monthly ad spend (cumulative is tracked by the client's monthlyAdSpend field)
    const investi = client.monthlyAdSpend

    // Gagne = total chantier from all won prospects
    const gagne = prospects
      .filter((p) =>
        ["ACOMPTE_RECU", "SOLDE_RECU", "TERMINE"].includes(p.status)
      )
      .reduce((sum, p) => sum + (p.totalChantier || 0), 0)

    // A reverser = total commission due to Celexia
    const aReverser = prospects.reduce(
      (sum, p) => sum + (p.commissionAmount || 0),
      0
    )

    // ROI = (gagne - investi) / investi * 100 (if investi > 0)
    const roi = investi > 0 ? ((gagne - investi) / investi) * 100 : 0

    const totalAppels = prospects.length
    const qualifies = prospects.filter((p) => p.isQualified === true).length
    const closes = prospects.filter((p) =>
      ["ACOMPTE_RECU", "SOLDE_RECU", "TERMINE"].includes(p.status)
    ).length

    return NextResponse.json({
      investi,
      gagne,
      aReverser,
      roi: Math.round(roi * 100) / 100,
      totalAppels,
      qualifies,
      closes,
    })
  } catch (error) {
    console.error("GET /api/stats/client/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
