import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/Button"
import { Shield, Wrench, Clock, CheckCircle2, ArrowRight, Lock, Headphones, FileText, AlertCircle, Video } from "lucide-react"
import Link from "next/link"

const plan = {
  name: "Pilot Setup",
  price: "$350",
  originalPrice: "$500",
  discount: "30% launch discount",
  period: "One-time",
  description: "Fast-track your QuiGuard deployment with hands-on expert help. Ship in hours, not weeks.",
  features: [
    "1-Hour Technical Consultation (Zoom)",
    "Custom Policy Configuration for your stack",
    "Deployment Verification & Health Check",
    "Team Training Session (Recording included)",
    "Custom Deployment Documentation",
    "30-Day Post-Setup Email Support",
  ],
  scarcity: "Limited to 10 slots/month",
  roi: "Save ~20 engineering hours",
  dodoUrl: "https://checkout.dodopayments.com/buy/pdt_0Nb2J9RFQzugHupkx2X6k?quantity=1",
}

export default async function CheckoutSetupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen grid-bg pt-24 text-center text-platinum">
        <h1 className="text-2xl mb-4">Access Denied</h1>
        <p className="text-platinum/50 mb-6 text-sm">You need to be logged in to book.</p>
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

        <div className="glass-card p-8 rounded-xl border border-electric/30 bg-electric/5 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-electric/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-electric/10 border border-electric/20">
                <Wrench className="w-5 h-5 text-electric" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-platinum">{plan.name}</h1>
                  <span className="px-2 py-0.5 bg-green-500/15 text-green-400 text-[10px] font-medium rounded-full border border-green-500/20">
                    {plan.discount}
                  </span>
                </div>
                <span className="text-platinum/40 text-xs">{plan.scarcity}</span>
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
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl font-bold text-platinum">{plan.price}</span>
              <span className="text-platinum/40 text-sm">{plan.period}</span>
              <span className="text-platinum/25 text-sm line-through">{plan.originalPrice}</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                <Clock className="w-3.5 h-3.5 text-electric" />
                <span className="text-[10px] text-platinum/60">{plan.roi}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                <Headphones className="w-3.5 h-3.5 text-electric" />
                <span className="text-[10px] text-platinum/60">30-day post-setup support</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                <Video className="w-3.5 h-3.5 text-electric" />
                <span className="text-[10px] text-platinum/60">Recording included</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 relative z-10">
            <h3 className="text-xs font-semibold text-platinum/40 uppercase tracking-wider mb-3">What you get</h3>
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                  <span className="text-platinum/70">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning */}
          <div className="mt-6 px-4 py-3 bg-yellow-500/5 border border-yellow-500/15 rounded-lg relative z-10">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-yellow-400/70 text-xs leading-relaxed">
                Non-refundable after the consultation session begins. If we cannot get QuiGuard running in your environment within the session, we&apos;ll continue working asynchronously until resolved.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 relative z-10">
            <a href={plan.dodoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full text-base">
                Pay {plan.price} &amp; Book
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
              <span>One-time payment</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
