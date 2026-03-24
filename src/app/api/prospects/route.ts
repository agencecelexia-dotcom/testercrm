import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")
    const status = searchParams.get("status")
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const where: Prisma.ProspectWhereInput = {}

    // Role-based filtering
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile) {
        return NextResponse.json({ error: "Profil client introuvable" }, { status: 404 })
      }
      where.clientId = clientProfile.id
    } else if (session.user.role === "CLOSER") {
      const closerProfile = await prisma.closerProfile.findUnique({
        where: { userId: session.user.id },
        include: { clients: { select: { id: true } } },
      })
      if (!closerProfile) {
        return NextResponse.json({ error: "Profil closer introuvable" }, { status: 404 })
      }
      const clientIds = closerProfile.clients.map((c) => c.id)
      where.clientId = { in: clientIds }
    }

    // Apply filters
    if (clientId) {
      where.clientId = clientId
    }

    if (status) {
      where.status = status as Prisma.EnumProspectStatusFilter
    }

    if (dateFrom || dateTo) {
      where.callDate = {}
      if (dateFrom) {
        where.callDate.gte = new Date(dateFrom)
      }
      if (dateTo) {
        where.callDate.lte = new Date(dateTo)
      }
    }

    const [prospects, total] = await Promise.all([
      prisma.prospect.findMany({
        where,
        include: {
          client: {
            include: {
              user: {
                select: { name: true, email: true },
              },
            },
          },
        },
        orderBy: { callDate: "desc" },
        skip,
        take: limit,
      }),
      prisma.prospect.count({ where }),
    ])

    return NextResponse.json({
      data: prospects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("GET /api/prospects error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    if (session.user.role !== "AGENCE" && session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    const body = await request.json()
    const {
      clientId,
      callerPhone,
      callerName,
      callDate,
      callDuration,
      callRecordingUrl,
      notes,
    } = body

    if (!clientId || !callerPhone || !callDate) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: clientId, callerPhone, callDate" },
        { status: 400 }
      )
    }

    // If CLIENT, verify they can only create for themselves
    if (session.user.role === "CLIENT") {
      const clientProfile = await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
      })
      if (!clientProfile || clientProfile.id !== clientId) {
        return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
      }
    }

    const client = await prisma.clientProfile.findUnique({
      where: { id: clientId },
    })

    if (!client) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
    }

    const prospect = await prisma.prospect.create({
      data: {
        clientId,
        callerPhone,
        callerName: callerName || null,
        callDate: new Date(callDate),
        callDuration: callDuration || null,
        callRecordingUrl: callRecordingUrl || null,
        notes: notes || null,
        status: "A_TRAITER",
      },
      include: {
        client: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    })

    return NextResponse.json(prospect, { status: 201 })
  } catch (error) {
    console.error("POST /api/prospects error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
