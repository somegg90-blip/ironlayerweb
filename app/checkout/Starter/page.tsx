import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/Button"
import { Shield, Zap, Cloud, Globe, FileText, Bell, Headphones, CheckCircle2, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

const plan = {
  name: "Starter",
  price: "$49",
  period: "/month",
  badge: "Cloud-hosted security",
  description: "Ship faster with managed infrastructure. No Docker needed.",
  features: [
    "Everything in Community (Free)",
    "Cloud Proxy Endpoint (proxy.quiguard.ai)",
    "Cloud Dashboard — Audit Log Viewer",
    "API Key Management (up to 5 keys)",
    "Pre-built Policy Templates (GDPR, HIPAA, SOC2)",
    "Webhook Notifications on blocked requests",
    "Export Logs (CSV)",
    "Email Support (48h response)",
    "Google OAuth SSO",
    "14-Day Free Trial — No credit card needed",
  ],
  limits: ["50,000 requests/month", "3 user seats", "30-day log retention"],
  dodoUrl: "https://checkout.dodopayments.com/buy/pdt_0Nbfxf92aoqYm24lL32aI?quantity=1",
}

export default async function CheckoutStarterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen grid-bg pt-24 text-center text-platinum">
        <h1 className="text-2xl mb-4">Access Denied</h1>
        <p className="text-platinum/50 mb-6 text-sm">You need to be logged in to checkout.</p>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen grid-bg pt-24 px-4 sm:px-6 pb-12 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Back link */}
        <Link href="/pricing" className="inline-flex items-center gap-1.5 text-platinum/40 text-xs hover:text-platinum/70 transition-colors mb-6">
          ← Back to Pricing
        </Link>

        <div className="glass-card p-8 rounded-xl border border-electric/20 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-electric/10 border border-electric/20">
                <Zap className="w-5 h-5 text-electric" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-platinum">QuiGuard {plan.name}</h1>
                </div>
                <span className="text-platinum/40 text-xs">{plan.badge}</span>
              </div>
            </div>

            <p className="text-platinum/50 text-sm mt-2">{plan.description}</p>

            {/* User info */}
            <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-obsidian rounded-lg border border-white/5">
              <div className="w-6 h-6 rounded-full bg-electric/20 flex items-center justify-center">
                <span className="text-electric text-[10px] font-bold">{user.email?.[0]?.toUpperCase()}</span>
              </div>
              <span className="text-platinum/60 text-xs">{user.email}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 ml-auto" />
            </div>
          </div>

          {/* Price Box */}
          <div className="mt-6 p-5 bg-obsidian rounded-lg border border-white/5 relative z-10">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-platinum">{plan.price}</span>
              <span className="text-platinum/40 text-sm">{plan.period}</span>
            </div>
            <p className="text-platinum/30 text-xs">Billed monthly. Cancel anytime. 14-day free trial included.</p>

            {/* Plan limits */}
            <div className="flex flex-wrap gap-2 mt-4">
              {plan.limits.map((limit) => (
                <span key={limit} className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] text-platinum/50 border border-white/5">
                  {limit}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 relative z-10">
            <h3 className="text-xs font-semibold text-platinum/40 uppercase tracking-wider mb-3">What&apos;s included</h3>
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                  <span className="text-platinum/70">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 relative z-10">
            <a href={plan.dodoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full text-base">
                Start 14-Day Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <div className="flex items-center justify-center gap-4 mt-4 text-platinum/30 text-[10px]">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Dodo Payments</span>
              </div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-4 text-center">
          <p className="text-platinum/30 text-xs">
            No credit card required for the free trial. Downgrade to Community anytime.
          </p>
        </div>
      </div>
    </main>
  )
}
