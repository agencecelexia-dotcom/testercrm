import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { ProspectStatus } from "@prisma/client"

function computeStatus(data: {
  isQualified?: boolean | null
  devisSent?: boolean
  devisAccepted?: boolean | null
  acompteReceived?: number | null
  soldeReceived?: number | null
  chantierDone?: boolean
}): ProspectStatus {
  if (data.chantierDone && data.soldeReceived) return "TERMINE"
  if (data.soldeReceived) return "SOLDE_RECU"
  if (data.acompteReceived) return "ACOMPTE_RECU"
  if (data.devisAccepted) return "DEVIS_ACCEPTE"
  if (data.devisSent) return "DEVIS_ENVOYE"
  if (data.isQualified === true) return "QUALIFIE"
  if (data.isQualified === false) return "NON_QUALIFIE"
  return "A_TRAITER"
}

function computeCommission(totalChantier: number | null | undefined): number | null {
  if (!totalChantier || totalChantier <= 0) return null
  return totalChantier * 0.10
}

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

    const prospect = await prisma.prospect.findUnique({
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

    if (!prospect) {
      return NextResponse.json({ error: "Prospect introuvable" }, { status: 404 })
    }

    // Role-based access
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile || clientProfile.id !== prospect.clientId) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || prospect.client.closerId !== closerProfile.id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    return NextResponse.json(prospect)
  } catch (error) {
    console.error("GET /api/prospects/[id] error:", error)
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

    const { id } = params
    const body = await request.json()

    const existing = await prisma.prospect.findUnique({
      where: { id },
      include: { client: true },
    })

    if (!existing) {
      return NextResponse.json({ error: "Prospect introuvable" }, { status: 404 })
    }

    // Role-based access
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile || clientProfile.id !== existing.clientId) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || existing.client.closerId !== closerProfile.id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    const {
      callerPhone,
      callerName,
      callDate,
      callDuration,
      callRecordingUrl,
      isQualified,
      unqualifiedReason,
      devisSent,
      devisSentDate,
      devisAmount,
      devisAccepted,
      devisAcceptedDate,
      acompteReceived,
      acompteDate,
      soldeReceived,
      soldeDate,
      totalChantier,
      chantierDone,
      commissionPaid,
      notes,
    } = body

    // Merge existing data with updates for status computation
    const merged = {
      isQualified: isQualified !== undefined ? isQualified : existing.isQualified,
      devisSent: devisSent !== undefined ? devisSent : existing.devisSent,
      devisAccepted:
        devisAccepted !== undefined ? devisAccepted : existing.devisAccepted,
      acompteReceived:
        acompteReceived !== undefined ? acompteReceived : existing.acompteReceived,
      soldeReceived:
        soldeReceived !== undefined ? soldeReceived : existing.soldeReceived,
      chantierDone:
        chantierDone !== undefined ? chantierDone : existing.chantierDone,
    }

    const computedStatus = computeStatus(merged)
    const finalTotalChantier =
      totalChantier !== undefined ? totalChantier : existing.totalChantier
    const commissionAmount = computeCommission(finalTotalChantier)

    const updated = await prisma.prospect.update({
      where: { id },
      data: {
        ...(callerPhone !== undefined && { callerPhone }),
        ...(callerName !== undefined && { callerName }),
        ...(callDate !== undefined && { callDate: new Date(callDate) }),
        ...(callDuration !== undefined && { callDuration }),
        ...(callRecordingUrl !== undefined && { callRecordingUrl }),
        ...(isQualified !== undefined && { isQualified }),
        ...(unqualifiedReason !== undefined && { unqualifiedReason }),
        ...(devisSent !== undefined && { devisSent }),
        ...(devisSentDate !== undefined && {
          devisSentDate: devisSentDate ? new Date(devisSentDate) : null,
        }),
        ...(devisAmount !== undefined && { devisAmount }),
        ...(devisAccepted !== undefined && { devisAccepted }),
        ...(devisAcceptedDate !== undefined && {
          devisAcceptedDate: devisAcceptedDate
            ? new Date(devisAcceptedDate)
            : null,
        }),
        ...(acompteReceived !== undefined && { acompteReceived }),
        ...(acompteDate !== undefined && {
          acompteDate: acompteDate ? new Date(acompteDate) : null,
        }),
        ...(soldeReceived !== undefined && { soldeReceived }),
        ...(soldeDate !== undefined && {
          soldeDate: soldeDate ? new Date(soldeDate) : null,
        }),
        ...(totalChantier !== undefined && { totalChantier }),
        ...(chantierDone !== undefined && { chantierDone }),
        ...(commissionPaid !== undefined && { commissionPaid }),
        ...(notes !== undefined && { notes }),
        status: computedStatus,
        commissionAmount,
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
    console.error("PATCH /api/prospects/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(
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

    const prospect = await prisma.prospect.findUnique({ where: { id } })
    if (!prospect) {
      return NextResponse.json({ error: "Prospect introuvable" }, { status: 404 })
    }

    await prisma.prospect.delete({ where: { id } })

    return NextResponse.json({ message: "Prospect supprime" })
  } catch (error) {
    console.error("DELETE /api/prospects/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
