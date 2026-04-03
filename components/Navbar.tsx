import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import { logout } from "@/app/auth/logout/action"
import {
  Shield,
  Github,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Sliders,
} from "lucide-react"

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ---- LEFT: Logo + Nav Links ---- */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-electric" />
            </div>
            <span className="text-lg font-bold text-platinum tracking-tight">QuiGuard</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-lg text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="px-3 py-2 rounded-lg text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-all"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/somegg90-blip/quiguard-gateway"
              target="_blank"
              className="px-3 py-2 rounded-lg text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-all flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>
        </div>

        {/* ---- RIGHT: Auth + User Menu ---- */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-1">
              {/* Dashboard */}
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-platinum/60 hover:text-platinum">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>

              {/* Settings */}
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="text-platinum/60 hover:text-platinum">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </Link>

              {/* Policy Editor */}
              <Link href="/policy">
                <Button variant="ghost" size="sm" className="text-platinum/60 hover:text-platinum">
                  <Sliders className="w-4 h-4" />
                  <span className="hidden sm:inline">Policy</span>
                </Button>
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-white/10 mx-1" />

              {/* User avatar + dropdown trigger */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-electric/15 border border-electric/20 flex items-center justify-center">
                    <span className="text-electric text-[11px] font-bold">
                      {user.email?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm text-platinum/60 max-w-[120px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-platinum/30 hidden md:block" />
                </button>

                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl bg-obsidian border border-white/10 shadow-2xl shadow-black/40 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] text-platinum/30 uppercase tracking-wider">Logged in as</p>
                    <p className="text-xs text-platinum/60 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Compliance Ledger
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings &amp; API Keys
                  </Link>

                  <Link
                    href="/policy"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-colors"
                  >
                    <Sliders className="w-4 h-4" />
                    Policy Editor
                  </Link>

                  <Link
                    href="/pricing"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-platinum/60 hover:text-platinum hover:bg-white/5 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    Manage Plan
                  </Link>

                  <div className="border-t border-white/5 mt-1 pt-1">
                    <form action={logout}>
                      <button
                        type="submit"
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}