// app/api/compliance/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const PROXY_URL = process.env.PROXY_URL || ""

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      )
    }

    // Read the session token from the request cookies
    // NextAuth/Supabase stores it in a cookie
    let accessToken: string | null = null

    // Try reading from Authorization header first
    const authHeader = req.headers.get("authorization")
    if (authHeader?.startsWith("Bearer ")) {
      accessToken = authHeader.replace("Bearer ", "")
    }

    // If no auth header, try reading from Supabase's cookie
    if (!accessToken) {
      // Supabase stores session in sb-<ref>-auth-token cookie
      const cookieHeader = req.headers.get("cookie") || ""
      const cookies = cookieHeader.split(";").map(c => c.trim())
      
      const authCookie = cookies.find(c => 
        c.startsWith("sb-") && c.includes("-auth-token=")
      )
      
      if (authCookie) {
        try {
          const cookieValue = decodeURIComponent(authCookie.split("=").slice(1).join("="))
          const parsed = JSON.parse(cookieValue)
          accessToken = parsed.access_token
        } catch (e) {
          console.error("Failed to parse auth cookie:", e)
        }
      }
    }

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized - no session found" }, { status: 401 })
    }

    // Validate the token with service role client
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)

    if (error || !user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
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