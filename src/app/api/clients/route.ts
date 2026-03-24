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

    const clients = await prisma.clientProfile.findMany({
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
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: { prospects: true, invoices: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(clients)
  } catch (error) {
    console.error("GET /api/clients error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
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
    const {
      email,
      password,
      name,
      phone,
      businessName,
      siret,
      address,
      city,
      postalCode,
      adAccountId,
      monthlyAdSpend,
      closerId,
    } = body

    if (!email || !password || !name || !businessName) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: email, password, name, businessName" },
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

    if (closerId) {
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

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "CLIENT",
        name,
        phone: phone || null,
        clientProfile: {
          create: {
            businessName,
            siret: siret || null,
            address: address || null,
            city: city || null,
            postalCode: postalCode || null,
            adAccountId: adAccountId || null,
            monthlyAdSpend: monthlyAdSpend || 0,
            closerId: closerId || null,
          },
        },
      },
      include: {
        clientProfile: {
          include: {
            closer: {
              include: {
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            },
          },
        },
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("POST /api/clients error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
