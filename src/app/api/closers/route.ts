import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    if (session.user.role !== "AGENCE") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    const closers = await prisma.closerProfile.findMany({
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
            prospects: {
              select: {
                totalChantier: true,
                commissionAmount: true,
                status: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const closersWithStats = closers.map((closer) => {
      const allProspects = closer.clients.flatMap((c) => c.prospects)
      const totalCaClients = allProspects.reduce(
        (sum, p) => sum + (p.totalChantier || 0),
        0
      )
      const totalCommissionCelexia = allProspects.reduce(
        (sum, p) => sum + (p.commissionAmount || 0),
        0
      )
      // Closer commission = 10% of Celexia revenue from their clients
      const closerCommission = totalCommissionCelexia * 0.10

      return {
        id: closer.id,
        userId: closer.userId,
        user: closer.user,
        clientCount: closer.clients.length,
        createdAt: closer.createdAt,
        updatedAt: closer.updatedAt,
        stats: {
          totalCaClients,
          totalCommissionCelexia,
          closerCommission,
        },
      }
    })

    return NextResponse.json(closersWithStats)
  } catch (error) {
    console.error("GET /api/closers error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

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
    const { email, password, name, phone } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: email, password, name" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe deja" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "CLOSER",
        name,
        phone: phone || null,
        closerProfile: {
          create: {},
        },
      },
      include: {
        closerProfile: true,
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("POST /api/closers error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
