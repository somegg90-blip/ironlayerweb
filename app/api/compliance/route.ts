// app/api/compliance/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const PROXY_URL = process.env.PROXY_URL || ""
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getSessionUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader) return null
  
  const { data: { user }, error } = await supabase.auth.getUser(
    authHeader.replace("Bearer ", "")
  )
  if (error || !user) return null
  return user
}

// GET /api/compliance?type=logs|stats&hours=720&...
export async function GET(req: NextRequest) {
  try {
    // Get the logged-in user from their session cookie
    const { data: { user } } = await supabase.auth.getUser(
      (await supabase.auth.getSession()).data.session?.access_token || ""
    )
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || "logs"
    
    // Forward all query params to backend, adding user_id
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