import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    if (session.user.role !== "AGENCE") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    // Revenus recus = sum of commission from paid invoices
    const paidInvoices = await prisma.invoice.findMany({
      where: { status: "PAID" },
    })
    const revenusRecus = paidInvoices.reduce(
      (sum, inv) => sum + inv.commission,
      0
    )

    // Revenus previsionnels = sum of commission from all non-paid invoices + prospects in pipeline
    const pendingInvoices = await prisma.invoice.findMany({
      where: { status: { in: ["PENDING", "SENT", "OVERDUE"] } },
    })
    const pendingInvoiceCommission = pendingInvoices.reduce(
      (sum, inv) => sum + inv.commission,
      0
    )

    // Also include prospects with devis accepted or acompte received (not yet invoiced)
    const pipelineProspects = await prisma.prospect.findMany({
      where: {
        status: { in: ["DEVIS_ACCEPTE", "ACOMPTE_RECU", "SOLDE_RECU"] },
      },
    })
    const pipelineCommission = pipelineProspects.reduce(
      (sum, p) => sum + (p.commissionAmount || 0),
      0
    )

    const revenusPrevisionnels = pendingInvoiceCommission + pipelineCommission

    // Clients actifs
    const clientsActifs = await prisma.clientProfile.count({
      where: { isActive: true },
    })

    // Appels du mois en cours
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const appelsMois = await prisma.prospect.count({
      where: {
        callDate: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    })

    return NextResponse.json({
      revenusRecus,
      revenusPrevisionnels,
      clientsActifs,
      appelsMois,
    })
  } catch (error) {
    console.error("GET /api/stats/agence error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
