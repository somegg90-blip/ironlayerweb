import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default async function CheckoutSetupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen grid-bg pt-24 text-center text-platinum">
        <h1 className="text-2xl">Access Denied</h1>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen grid-bg pt-24 px-6 flex items-center justify-center">
      <div className="glass-card p-8 rounded-xl max-w-lg w-full text-center border border-electric/20">
        <h1 className="text-2xl font-bold mb-2 text-platinum">Confirm Your Setup</h1>
        <p className="text-platinum/60 mb-4 text-sm">Logged in as: <strong>{user.email}</strong></p>
        
        <div className="p-6 bg-obsidian rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-electric mb-4">Pilot Setup Package ($500)</h2>
          <ul className="text-left text-sm text-platinum/70 space-y-2 mb-4">
            <li>✅ 1-Hour Technical Consultation</li>
            <li>✅ Custom Policy Configuration</li>
            <li>✅ Deployment Verification</li>
            <li>✅ Team Training Session</li>
          </ul>
        </div>

        <a href="https://checkout.dodopayments.com/buy/pdt_0Nb2J9RFQzugHupkx2X6k?quantity=1" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" className="w-full">
            Pay $500 & Book
          </Button>
        </a>
        
        <p className="text-xs text-platinum/40 mt-4">
          Powered by Dodo Payments. Non-refundable after session.
        </p>
      </div>
    </main>
  )
}