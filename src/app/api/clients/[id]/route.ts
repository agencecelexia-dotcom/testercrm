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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            createdAt: true,
          },
        },
        closer: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        _count: {
          select: { prospects: true, invoices: true },
        },
      },
    })

    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    // Role-based access: CLIENT can only see their own profile
    if (session.user.role === "CLIENT") {
      const userClient = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!userClient || userClient.id !== id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    // CLOSER can only see their assigned clients
    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || client.closerId !== closerProfile.id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    // Compute basic stats
    const prospects = await prisma.prospect.findMany({
      where: { clientId: id },
    })

    const stats = {
      totalProspects: prospects.length,
      qualified: prospects.filter((p) => p.isQualified === true).length,
      devisSent: prospects.filter((p) => p.devisSent).length,
      won: prospects.filter((p) =>
        ["ACOMPTE_RECU", "SOLDE_RECU", "TERMINE"].includes(p.status)
      ).length,
      totalRevenue: prospects.reduce(
        (sum, p) => sum + (p.totalChantier || 0),
        0
      ),
      totalCommission: prospects.reduce(
        (sum, p) => sum + (p.commissionAmount || 0),
        0
      ),
    }

    return NextResponse.json({ ...client, stats })
  } catch (error) {
    console.error("GET /api/clients/[id] error:", error)
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

    const existing = await prisma.clientProfile.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!existing) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    const {
      name,
      phone,
      email,
      businessName,
      siret,
      address,
      city,
      postalCode,
      adAccountId,
      monthlyAdSpend,
      closerId,
      isActive,
    } = body

    // Update user fields if provided
    if (name || phone || email) {
      if (email && email !== existing.user.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email },
        })
        if (emailExists) {
          return NextResponse.json(
            { error: "Cet email est deja utilise" },
            { status: 409 }
          )
        }
      }

      await prisma.user.update({
        where: { id: existing.userId },
        data: {
          ...(name !== undefined && { name }),
          ...(phone !== undefined && { phone }),
          ...(email !== undefined && { email }),
        },
      })
    }

    if (closerId !== undefined && closerId !== null) {
      const closerExists = await prisma.closerProfile.findUnique({
        where: { id: closerId },
      })
      if (!closerExists) {
        return NextResponse.json(
          { error: "Closer introuvable" },
          { status: 404 }
        )
      }
    }

    const updatedClient = await prisma.clientProfile.update({
      where: { id },
      data: {
        ...(businessName !== undefined && { businessName }),
        ...(siret !== undefined && { siret }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(postalCode !== undefined && { postalCode }),
        ...(adAccountId !== undefined && { adAccountId }),
        ...(monthlyAdSpend !== undefined && { monthlyAdSpend }),
        ...(closerId !== undefined && { closerId }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        closer: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    })

    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error("PATCH /api/clients/[id] error:", error)
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

    const client = await prisma.clientProfile.findUnique({
      where: { id },
      include: { _count: { select: { prospects: true, invoices: true } } },
    })

    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    // Soft delete if there are related records
    if (client._count.prospects > 0 || client._count.invoices > 0) {
      await prisma.clientProfile.update({
        where: { id },
        data: { isActive: false },
      })
      return NextResponse.json({ message: "Client desactive (donnees liees existantes)" })
    }

    // Hard delete if no related records
    await prisma.clientProfile.delete({ where: { id } })
    await prisma.user.delete({ where: { id: client.userId } })

    return NextResponse.json({ message: "Client supprime" })
  } catch (error) {
    console.error("DELETE /api/clients/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
