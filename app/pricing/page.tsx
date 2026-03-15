import { Button } from "@/components/ui/Button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "For developers and testing.",
    features: ["PII Scrubbing", "Basic Regex", "Self-Hosted", "Community Support"],
    cta: "Get Started",
    link: "https://github.com/somegg90-blip/ironlayer-gateway"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams needing security.",
    features: ["SSO (Okta/Auth0)", "Audit Logs UI", "Custom Integrations", "Priority Support"],
    cta: "Contact Sales",
    link: "/contact",
    featured: true
  }
]

export default function PricingPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Simple Pricing</h1>
          <p className="text-platinum/60">Open Source Core. Enterprise Scale.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`glass-card p-8 rounded-xl ${tier.featured ? 'border-electric/50' : ''}`}>
              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <p className="text-platinum/60 text-sm mb-6">{tier.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-platinum/80">
                    <Check className="w-4 h-4 text-electric" /> {feature}
                  </li>
                ))}
              </ul>
              <a href={tier.link} target={tier.link.startsWith('http') ? "_blank" : ""}>
                <Button variant={tier.featured ? "primary" : "secondary"} className="w-full">
                  {tier.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}