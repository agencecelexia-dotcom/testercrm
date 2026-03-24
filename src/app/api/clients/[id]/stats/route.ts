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

    const client = await prisma.clientProfile.findUnique({ where: { id } })
    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    // Role-based access
    if (session.user.role === "CLIENT") {
      const userClient = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!userClient || userClient.id !== id) {
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

    // Parse optional month/year from query params
    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month")
      ? parseInt(searchParams.get("month")!)
      : null
    const year = searchParams.get("year")
      ? parseInt(searchParams.get("year")!)
      : null

    // Build date filter for monthly stats
    let dateFilter: { callDate?: { gte: Date; lt: Date } } = {}
    if (month && year) {
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 1)
      dateFilter = { callDate: { gte: startDate, lt: endDate } }
    }

    const prospects = await prisma.prospect.findMany({
      where: {
        clientId: id,
        ...dateFilter,
      },
    })

    const totalCalls = prospects.length
    const qualified = prospects.filter((p) => p.isQualified === true).length
    const devisSent = prospects.filter((p) => p.devisSent).length
    const won = prospects.filter((p) =>
      ["ACOMPTE_RECU", "SOLDE_RECU", "TERMINE"].includes(p.status)
    ).length
    const totalRevenue = prospects.reduce(
      (sum, p) => sum + (p.totalChantier || 0),
      0
    )
    const commissionDue = prospects.reduce(
      (sum, p) => sum + (p.commissionAmount || 0),
      0
    )

    return NextResponse.json({
      totalCalls,
      qualified,
      devisSent,
      won,
      totalRevenue,
      commissionDue,
    })
  } catch (error) {
    console.error("GET /api/clients/[id]/stats error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
