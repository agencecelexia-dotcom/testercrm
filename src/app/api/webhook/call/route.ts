import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Validate webhook secret
    const secret = request.headers.get("X-Celexia-Secret")
    const expectedSecret = process.env.CELEXIA_WEBHOOK_SECRET

    if (!expectedSecret) {
      console.error("CELEXIA_WEBHOOK_SECRET not configured")
      return NextResponse.json(
        { error: "Webhook non configure" },
        { status: 500 }
      )
    }

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Secret invalide" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      client_id,
      caller_phone,
      caller_name,
      call_date,
      call_duration,
      recording_url,
    } = body

    if (!client_id || !caller_phone || !call_date) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: client_id, caller_phone, call_date" },
        { status: 400 }
      )
    }

    // Verify client exists
    const client = await prisma.clientProfile.findUnique({
      where: { id: client_id },
    })

    if (!client) {
      return NextResponse.json(
        { error: "Client introuvable" },
        { status: 404 }
      )
    }

    if (!client.isActive) {
      return NextResponse.json(
        { error: "Client inactif" },
        { status: 400 }
      )
    }

    const prospect = await prisma.prospect.create({
      data: {
        clientId: client_id,
        callerPhone: caller_phone,
        callerName: caller_name || null,
        callDate: new Date(call_date),
        callDuration: call_duration || null,
        callRecordingUrl: recording_url || null,
        status: "A_TRAITER",
      },
    })

    return NextResponse.json(
      { success: true, prospectId: prospect.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/webhook/call error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
