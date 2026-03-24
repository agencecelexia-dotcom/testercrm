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

    // CLOSER can only view their own profile
    if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!closerProfile || closerProfile.id !== id) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    // CLIENT cannot access closer details
    if (session.user.role === "CLIENT") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    const closer = await prisma.closerProfile.findUnique({
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
        clients: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
            _count: { select: { prospects: true } },
          },
        },
      },
    })

    if (!closer) {
      return NextResponse.json({ error: "Closer introuvable" }, { status: 404 })
    }

    return NextResponse.json(closer)
  } catch (error) {
    console.error("GET /api/closers/[id] error:", error)
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

    const closer = await prisma.closerProfile.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!closer) {
      return NextResponse.json({ error: "Closer introuvable" }, { status: 404 })
    }

    const { name, phone, email } = body

    if (email && email !== closer.user.email) {
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
      where: { id: closer.userId },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
      },
    })

    const updatedCloser = await prisma.closerProfile.findUnique({
      where: { id },
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
        clients: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    })

    return NextResponse.json(updatedCloser)
  } catch (error) {
    console.error("PATCH /api/closers/[id] error:", error)
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

    const closer = await prisma.closerProfile.findUnique({
      where: { id },
      include: { _count: { select: { clients: true } } },
    })

    if (!closer) {
      return NextResponse.json({ error: "Closer introuvable" }, { status: 404 })
    }

    if (closer._count.clients > 0) {
      return NextResponse.json(
        { error: "Impossible de supprimer un closer avec des clients assignes. Reassignez les clients d'abord." },
        { status: 400 }
      )
    }

    await prisma.closerProfile.delete({ where: { id } })
    await prisma.user.delete({ where: { id: closer.userId } })

    return NextResponse.json({ message: "Closer supprime" })
  } catch (error) {
    console.error("DELETE /api/closers/[id] error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
