import { Button } from "@/components/ui/Button"
import { Check, X, Sparkles, Shield, Wrench, Clock, AlertCircle } from "lucide-react"

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "For developers & testing.",
    features: [
      { text: "Core Proxy (Docker)", included: true },
      { text: "PII & Tool Call Scrubbing", included: true },
      { text: "Manual Config (YAML)", included: true },
      { text: "Community Support", included: true },
      { text: "Cloud Dashboard", included: false },
      { text: "SSO & SAML", included: false },
    ],
    cta: "Get Started",
    link: "https://github.com/somegg90-blip/QuiGuard-gateway",
    highlight: false
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    description: "For teams needing visibility & ease.",
    features: [
      { text: "Everything in Community", included: true },
      { text: "Managed Cloud Hosting", included: true },
      { text: "Web Dashboard (Logs UI)", included: true },
      { text: "One-Click Policy Config", included: true },
      { text: "Priority Email Support", included: true },
      { text: "SSO & SAML", included: false },
    ],
    cta: "Start Pro Trial",
    link: "https://checkout.dodopayments.com/buy/pdt_0Nb2HZkDAZBfV6caDkE9n?quantity=1", // REPLACE THIS
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For regulated industries.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "SSO (Okta/Auth0)", included: true },
      { text: "SLA (99.9% Uptime)", included: true },
      { text: "Indemnification Clause", included: true },
      { text: "Dedicated Slack Channel", included: true },
      { text: "Custom Integrations", included: true },
    ],
    cta: "Contact Sales",
    link: "/contact",
    highlight: false
  }
]

const setupService = {
  name: "Pilot Setup",
  price: "$500",
  period: "One-time",
  description: "Fast-track your deployment with expert help.",
  features: [
    "1-Hour Technical Consultation (Zoom)",
    "Custom Policy Configuration for your data",
    "Deployment Verification & Health Check",
    "Team Training Session (Recording included)"
  ],
  scarcity: "Limited to 5 slots/month",
  roi: "Save ~20 engineering hours",
  cta: "Book Setup",
  link: "https://checkout.dodopayments.com/buy/pdt_0Nb2J9RFQzugHupkx2X6k?quantity=1" // REPLACE THIS
}

export default function PricingPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Simple, Transparent Pricing</h1>
          <p className="text-platinum/60 max-w-2xl mx-auto">
            Start with our open-source core. Upgrade when you need visibility, compliance, or scale.
          </p>
        </div>
        
        {/* Main Pricing Grid */}
        {/* Added pt-6 to give space for the badge to float above */}
        <div className="grid md:grid-cols-3 gap-8 items-start pt-6">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              // CHANGED: Added overflow-visible and pt-4 for badge space
              className={`glass-card p-8 rounded-xl flex flex-col h-full relative pt-4 overflow-visible ${tier.highlight ? 'border-electric border-2' : 'border-white/10'}`}
            >
              {tier.highlight && (
                // CHANGED: Added z-10 to ensure it stays on top
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-electric text-obsidian text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-10">
                  <Sparkles className="w-3.5 h-3.5" /> MOST POPULAR
                </div>
              )}
              
              <div className="mb-6 mt-2">
                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                <p className="text-platinum/60 text-sm">{tier.description}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-platinum/50">{tier.period}</span>}
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-electric shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-platinum/30 shrink-0" />
                    )}
                    <span className={feature.included ? "text-platinum/80" : "text-platinum/40 line-through"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a href={tier.link} target={tier.link.startsWith('http') ? "_blank" : ""} className="block">
                <Button 
                  variant={tier.highlight ? "primary" : "secondary"} 
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Service Add-on Section */}
        <div className="mt-20 flex justify-center">
          <div className="glass-card p-8 rounded-xl max-w-2xl w-full border border-electric/30 bg-electric/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-4 rounded-xl bg-electric/10 border border-electric/20">
                  <Wrench className="w-8 h-8 text-electric" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-platinum">{setupService.name}</h3>
                  <span className="px-2 py-1 bg-electric/20 text-electric text-xs font-medium rounded-full border border-electric/30">
                    {setupService.scarcity}
                  </span>
                </div>
                
                <p className="text-platinum/60 text-sm mb-4">{setupService.description}</p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-platinum/5 rounded-lg border border-white/5 mb-6">
                  <Clock className="w-4 h-4 text-electric" />
                  <span className="text-sm text-platinum/80">{setupService.roi}</span>
                </div>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {setupService.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-platinum/80">
                      <Check className="w-4 h-4 text-electric shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{setupService.price}</span>
                      <span className="text-platinum/50 text-sm">{setupService.period}</span>
                    </div>
                    <p className="text-xs text-platinum/40 mt-1">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Non-refundable after session begins
                    </p>
                  </div>
                  <a href={setupService.link} target="_blank">
                    <Button variant="primary" size="lg">
                      {setupService.cta}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="glass-card p-4 rounded-lg cursor-pointer group">
              <summary className="flex items-center justify-between text-platinum/90 font-medium list-none">
                <span>Can I switch from Self-Hosted to Cloud later?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-platinum/60 text-sm">
                Yes. Your policy.yaml configuration is portable. You can migrate to our Cloud Dashboard at any time by updating your API endpoint.
              </p>
            </details>
            
            <details className="glass-card p-4 rounded-lg cursor-pointer group">
              <summary className="flex items-center justify-between text-platinum/90 font-medium list-none">
                <span>What if the $500 Setup doesn't work for us?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-platinum/60 text-sm">
                We offer a "Success Guarantee": if we cannot get QuiGuard running in your environment within the session, we'll continue working asynchronously until it's resolved, or refund 50% of the fee.
              </p>
            </details>
            
            <details className="glass-card p-4 rounded-lg cursor-pointer group">
              <summary className="flex items-center justify-between text-platinum/90 font-medium list-none">
                <span>Do you sign BAAs or DPAs?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-platinum/60 text-sm">
                Yes, Data Processing Addendums (DPAs) are included with Pro and Enterprise plans. Business Associate Agreements (BAAs) are available for Enterprise customers handling HIPAA-regulated data.
              </p>
            </details>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 text-center">
          <p className="text-platinum/40 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Payments secured via Dodo Payments. Cancel Pro anytime. All plans include MIT License core.
          </p>
        </div>
      </div>
    </main>
  )
}
