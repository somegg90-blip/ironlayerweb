import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import { logout } from "@/app/auth/logout/action"
import { Shield, Github, User, LayoutDashboard } from "lucide-react"

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user is a paid customer
  let isPaidUser = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles') // Ensure you have this table
      .select('is_paid')
      .eq('id', user.id)
      .single()
    
    isPaidUser = profile?.is_paid ?? false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LEFT SIDE: Logo & Main Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity">
            <Shield className="w-6 h-6 text-electric" />
            <span>QuiGuard</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-platinum/70">
            <Link href="/pricing" className="hover:text-platinum transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-platinum transition-colors">Docs</Link>
          </div>
        </div>

        {/* RIGHT SIDE: Auth / Social */}
        <div className="flex items-center gap-4">
          <Link href="https://github.com/somegg90-blip/quiguard-gateway" target="_blank">
            <Button variant="ghost" className="p-2"><Github className="w-5 h-5" /></Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-6">
              {/* ONLY SHOW DASHBOARD FOR PAID USERS */}
              {isPaidUser && (
                <Link href="/dashboard" className="flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden md:block">Audit Logs</span>
                </Link>
              )}
              
              <Link href="/dashboard">
                <Button variant="ghost" className="p-2" title="Account">
                  <User className="w-5 h-5 text-platinum/70" />
                </Button>
              </Link>
              
              <form action={logout}>
                <button type="submit" className="text-sm text-platinum/60 hover:text-platinum transition-colors pr-2">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}