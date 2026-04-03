import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const PROXY_URL = process.env.PROXY_URL

// ============================================================
// GET /api/policy — Fetch user's merged policy
// ============================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(`${PROXY_URL}/api/policy?user_id=${user.id}`, {
      cache: "no-store",
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[Policy API] GET error:", error)
    return NextResponse.json({ error: "Failed to fetch policy" }, { status: 500 })
  }
}

// ============================================================
// PUT /api/policy — Save user's policy overrides
// ============================================================
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const res = await fetch(`${PROXY_URL}/api/policy`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, policy: body.policy }),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[Policy API] PUT error:", error)
    return NextResponse.json({ error: "Failed to save policy" }, { status: 500 })
  }
}

// ============================================================
// DELETE /api/policy — Reset user's policy to defaults
// ============================================================
export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(`${PROXY_URL}/api/policy?user_id=${user.id}`, {
      method: "DELETE",
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[Policy API] DELETE error:", error)
    return NextResponse.json({ error: "Failed to reset policy" }, { status: 500 })
  }
}