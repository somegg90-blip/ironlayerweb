// app/api/compliance/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const PROXY_URL = process.env.PROXY_URL || ""

export async function GET(req: NextRequest) {
  try {
    // Use the SAME Supabase SSR pattern as middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll() {
            // No-op — we only need to read
          },
        },
      }
    )

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || "logs"

    const params = new URLSearchParams(searchParams.toString())
    params.set("user_id", user.id)

    const url = type === "stats"
      ? `${PROXY_URL}/api/audit-stats?${params}`
      : `${PROXY_URL}/api/audit-logs?${params}`

    const res = await fetch(url, { cache: "no-store" })
    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    console.error("Compliance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}