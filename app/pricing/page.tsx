"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  Check,
  X,
  Sparkles,
  Shield,
  Wrench,
  Clock,
  AlertCircle,
  Zap,
  Users,
  Building2,
  ChevronDown,
  ArrowRight,
  Lock,
  Globe,
  Server,
  FileText,
  BarChart3,
  Bell,
  Webhook,
  Headphones,
  ShieldCheck,
} from "lucide-react"

// ============================================================
// Pricing Strategy:
//   Community (Free)  → Self-hosted open source, dev funnel
//   Starter ($49/mo)  → Cloud entry point, impulse-buy territory
//   Pro ($149/mo)     → Full-featured, compliance-ready, MOST POPULAR
//   Enterprise (Custom) → Regulated industries, dedicated support
//   Setup Service ($299 one-time) → Add-on for all paid plans
// ============================================================

// ---- Feature type ----
interface Feature {
  text: string
  included: boolean
  tooltip?: string
}

interface Tier {
  name: string
  badge?: string
  price: number | null // null = custom pricing
  description: string
  targetAudience: string
  icon: React.ReactNode
  features: Feature[]
  limits?: string[]
  cta: string
  link: string
  highlight: boolean
  borderColor?: string
}

// ============================================================
// Tier Definitions
// ============================================================

const tiers: Tier[] = [
  {
    name: "Community",
    price: 0,
    description: "Self-hosted, open-source core for developers who want full control.",
    targetAudience: "Solo developers & open-source contributors",
    icon: <Server className="w-5 h-5" />,
    features: [
      { text: "Open Source Proxy (Docker)", included: true, tooltip: "Full MIT-licensed codebase" },
      { text: "PII Detection & Redaction", included: true, tooltip: "Emails, names, URLs, phone numbers, SSN, etc." },
      { text: "Tool Call Sanitization (Outbound)", included: true, tooltip: "Scrub secrets from agent tool arguments" },
      { text: "Tool Response Sanitization (Inbound)", included: true, tooltip: "The Gatekeeper — scrub PII from API responses" },
      { text: "Round-Trip Restoration", included: true, tooltip: "Replace placeholders with real values for the end-user" },
      { text: "Recursive JSON Traversal", included: true, tooltip: "Deep-scan nested JSON structures" },
      { text: "Manual Config (policy.yaml)", included: true },
      { text: "Deterministic Placeholders", included: true, tooltip: "Same input always produces same placeholder" },
      { text: "Community Support (GitHub/Discord)", included: true },
      { text: "Cloud Dashboard", included: false },
      { text: "Managed Cloud Hosting", included: false },
      { text: "SSO / SAML", included: false },
      { text: "Priority Support", included: false },
    ],
    limits: [
      "Self-hosted only",
      "1 user seat",
      "1 API key",
      "Local audit logs (.jsonl)",
    ],
    cta: "Get Started Free",
    link: "https://github.com/somegg90-blip/QuiGuard-gateway",
    highlight: false,
  },
  {
    name: "Starter",
    price: 49,
    description: "Cloud-hosted proxy with a basic dashboard. Ship faster without managing infrastructure.",
    targetAudience: "Indie hackers & small AI agencies",
    icon: <Zap className="w-5 h-5" />,
    badge: "Best value to start",
    features: [
      { text: "Everything in Community", included: true },
      { text: "Cloud Proxy Endpoint", included: true, tooltip: "proxy.quiguard.ai — no Docker needed" },
      { text: "Cloud Dashboard (Audit Logs)", included: true, tooltip: "View sanitized logs in a web UI" },
      { text: "API Key Management", included: true },
      { text: "Email Support (48h response)", included: true },
      { text: "Webhook Notifications", included: true, tooltip: "Get alerts on blocked requests" },
      { text: "Pre-built Policy Templates", included: true, tooltip: "GDPR, HIPAA, SOC2 starter configs" },
      { text: "Export Logs (CSV)", included: true },
      { text: "Advanced Policy Editor", included: false },
      { text: "Team Management", included: false },
      { text: "SSO / SAML", included: false },
      { text: "Custom Integrations", included: false },
    ],
    limits: [
      "50,000 requests/month",
      "3 user seats",
      "5 API keys",
      "30-day log retention",
    ],
    cta: "Start 14-Day Free Trial",
    link: "/checkout/Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: 149,
    description: "Full visibility, advanced policies, and compliance-ready features for growing teams.",
    targetAudience: "AI teams & startups with compliance needs",
    icon: <Users className="w-5 h-5" />,
    badge: "Most popular",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Advanced Dashboard (Charts & Analytics)", included: true, tooltip: "Event timelines, entity breakdowns, trend analysis" },
      { text: "Advanced Policy Editor (No-Code)", included: true, tooltip: "Build custom rules without YAML" },
      { text: "Custom Regex Patterns", included: true, tooltip: "Define your own entity detection rules" },
      { text: "Team Management (10 seats)", included: true },
      { text: "Priority Support (12h response)", included: true },
      { text: "Slack / Email Alerts", included: true },
      { text: "Export Reports (PDF & CSV)", included: true },
      { text: "Role-Based Access Control", included: true, tooltip: "Admin, Analyst, Viewer roles" },
      { text: "90-Day Log Retention", included: true },
      { text: "DPA Included", included: true, tooltip: "Data Processing Addendum" },
      { text: "SAML SSO (Okta/Auth0)", included: false },
      { text: "Dedicated Support Engineer", included: false },
      { text: "Data Residency Options", included: false },
    ],
    limits: [
      "500,000 requests/month",
      "10 user seats",
      "25 API keys",
      "90-day log retention",
    ],
    cta: "Start 14-Day Free Trial",
    link: "/checkout/Pro",
    highlight: true,
    borderColor: "border-electric",
  },
  {
    name: "Enterprise",
    price: null,
    description: "For regulated industries that need dedicated support, SLA guarantees, and custom integrations.",
    targetAudience: "Fintech, Healthtech & large organizations",
    icon: <Building2 className="w-5 h-5" />,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited Requests", included: true },
      { text: "Unlimited Seats & API Keys", included: true },
      { text: "SAML SSO (Okta, Auth0, Azure AD)", included: true },
      { text: "SLA (99.9% Uptime)", included: true },
      { text: "Dedicated Support Engineer", included: true },
      { text: "Dedicated Slack Channel", included: true },
      { text: "BAA Available (HIPAA)", included: true, tooltip: "Business Associate Agreement" },
      { text: "Data Residency (EU / US / AP)", included: true, tooltip: "Pin your data to a specific region" },
      { text: "Custom Integrations", included: true },
      { text: "Indemnification Clause", included: true },
      { text: "On-Premise Deployment Option", included: true },
      { text: "Quarterly Security Reviews", included: true },
      { text: "Custom SLA & Contract Terms", included: true },
    ],
    cta: "Contact Sales",
    link: "/contact",
    highlight: false,
  },
]

// ---- Setup Service ----
const setupService = {
  name: "Pilot Setup",
  price: "$350",
  originalPrice: "$500",
  discount: "40% launch discount",
  period: "One-time",
  description: "Fast-track your deployment with hands-on expert help. Perfect for teams that want to ship QuiGuard in hours, not weeks.",
  features: [
    "1-Hour Technical Consultation (Zoom)",
    "Custom Policy Configuration for your stack",
    "Deployment Verification & Health Check",
    "Team Training Session (Recording included)",
    "30-Day Post-Setup Email Support",
    "Custom Deployment Documentation",
  ],
  scarcity: "Limited to 10 slots/month",
  roi: "Save ~20 engineering hours",
  cta: "Book Setup",
  link: "/checkout/Setup",
}

// ---- Comparison Categories ----
const comparisonCategories = [
  {
    category: "Core Security",
    features: [
      { name: "PII Detection & Redaction", community: true, starter: true, pro: true, enterprise: true },
      { name: "Tool Call Sanitization (Outbound)", community: true, starter: true, pro: true, enterprise: true },
      { name: "Tool Response Sanitization (Inbound)", community: true, starter: true, pro: true, enterprise: true },
      { name: "Round-Trip Restoration", community: true, starter: true, pro: true, enterprise: true },
      { name: "Recursive JSON Traversal", community: true, starter: true, pro: true, enterprise: true },
      { name: "Deterministic Placeholders", community: true, starter: true, pro: true, enterprise: true },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    features: [
      { name: "Self-Hosted (Docker)", community: true, starter: true, pro: true, enterprise: true },
      { name: "Managed Cloud Endpoint", community: false, starter: true, pro: true, enterprise: true },
      { name: "Monthly Requests", community: "Unlimited (local)", starter: "50K", pro: "500K", enterprise: "Unlimited" },
      { name: "Data Residency (EU/US/AP)", community: false, starter: false, pro: false, enterprise: true },
      { name: "On-Premise Deployment", community: true, starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Dashboard & Analytics",
    features: [
      { name: "Local Audit Logs (.jsonl)", community: true, starter: false, pro: false, enterprise: false },
      { name: "Cloud Audit Log Viewer", community: false, starter: true, pro: true, enterprise: true },
      { name: "Charts & Analytics", community: false, starter: false, pro: true, enterprise: true },
      { name: "Export Reports (CSV)", community: false, starter: true, pro: true, enterprise: true },
      { name: "Export Reports (PDF)", community: false, starter: false, pro: true, enterprise: true },
      { name: "Log Retention", community: "Local only", starter: "30 days", pro: "90 days", enterprise: "Custom" },
    ],
  },
  {
    category: "Policies & Configuration",
    features: [
      { name: "Manual Config (YAML)", community: true, starter: true, pro: true, enterprise: true },
      { name: "Pre-built Policy Templates", community: false, starter: true, pro: true, enterprise: true },
      { name: "No-Code Policy Editor", community: false, starter: false, pro: true, enterprise: true },
      { name: "Custom Regex Patterns", community: false, starter: false, pro: true, enterprise: true },
      { name: "Action Modes (Mask/Warn/Block)", community: true, starter: true, pro: true, enterprise: true },
    ],
  },
  {
    category: "Team & Access",
    features: [
      { name: "User Seats", community: "1", starter: "3", pro: "10", enterprise: "Unlimited" },
      { name: "API Keys", community: "1", starter: "5", pro: "25", enterprise: "Unlimited" },
      { name: "Role-Based Access Control", community: false, starter: false, pro: true, enterprise: true },
      { name: "Google OAuth SSO", community: false, starter: true, pro: true, enterprise: true },
      { name: "SAML SSO (Okta/Auth0)", community: false, starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Support & Compliance",
    features: [
      { name: "Community Support (GitHub/Discord)", community: true, starter: true, pro: true, enterprise: true },
      { name: "Email Support", community: false, starter: "48h", pro: "12h", enterprise: "4h" },
      { name: "Dedicated Slack Channel", community: false, starter: false, pro: false, enterprise: true },
      { name: "SLA Guarantee", community: false, starter: false, pro: "99.5%", enterprise: "99.9%" },
      { name: "DPA Included", community: false, starter: false, pro: true, enterprise: true },
      { name: "BAA Available (HIPAA)", community: false, starter: false, pro: false, enterprise: true },
      { name: "Indemnification Clause", community: false, starter: false, pro: false, enterprise: true },
    ],
  },
]

// ---- FAQ ----
const faqs = [
  {
    question: "What counts as a 'request'?",
    answer:
      "A request is any single API call that passes through the QuiGuard proxy — whether it's a chat completion, a tool call, or a tool response. Each direction (inbound or outbound) is counted as one request. So a typical agent interaction with one tool call = 3 requests (prompt + tool call + tool response).",
  },
  {
    question: "Can I switch from Self-Hosted to Cloud later?",
    answer:
      "Absolutely. Your policy.yaml configuration is fully portable. You can migrate to our Cloud Dashboard at any time by updating your API endpoint to proxy.quiguard.ai and importing your existing policy. Your agent code doesn't change at all — that's the whole point of a reverse proxy.",
  },
  {
    question: "What happens if I exceed my monthly request limit?",
    answer:
      "We won't block your traffic unexpectedly. If you approach your limit (80%), you'll receive an email and Slack alert. If you exceed it, requests continue to flow but you'll be prompted to upgrade within 48 hours. Overage charges are billed at $0.001/request for Starter and $0.0005/request for Pro.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes — both Starter and Pro come with a 14-day free trial. No credit card required to start. You get full access to all features in your chosen tier. At the end of the trial, you can subscribe or downgrade to Community without losing any data.",
  },
  {
    question: "How is QuiGuard different from traditional PII redaction tools?",
    answer:
      "Traditional tools like Microsoft Presidio scan static text. QuiGuard operates as a live reverse proxy between AI agents and LLMs — it sanitizes data in transit, not at rest. More critically, it handles the agent execution layer: scrubbing tool_call arguments (outbound) and tool_response data (inbound), which traditional tools don't even see. The round-trip restoration mechanism ensures agents can reason about sensitive data without ever 'seeing' it.",
  },
  {
    question: "Do you sign BAAs or DPAs?",
    answer:
      "Data Processing Addendums (DPAs) are included with Pro and Enterprise plans at no extra cost. Business Associate Agreements (BAAs) for HIPAA-regulated data are available for Enterprise customers. We can also accommodate custom security documentation requirements during the sales process.",
  },
  {
    question: "What's the Pilot Setup service?",
    answer:
      "It's a one-time consulting session where we help you deploy QuiGuard into your specific stack — whether that's a LangChain agent, a CrewAI pipeline, or a custom Python setup. We configure your policies, verify the deployment, and train your team. Think of it as 'white-glove onboarding' that saves ~20 engineering hours of trial and error.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. All paid plans are month-to-month with no long-term contracts. You can cancel from your dashboard at any time. Your data will be retained for 30 days after cancellation, giving you time to export anything you need.",
  },
  {
    question: "Is the open-source version limited in functionality?",
    answer:
      "No. The Community (self-hosted) version includes 100% of the core proxy functionality — PII detection, tool call sanitization, inbound response scrubbing, recursive JSON traversal, round-trip restoration. The only difference is operational: cloud hosting, managed dashboard, team features, and enterprise support require a paid plan.",
  },
]

// ============================================================
// Pricing Page Component
// ============================================================

export default function PricingPage() {
  const [showComparison, setShowComparison] = useState(false)

  function getPrice(tier: Tier) {
    if (tier.price === null) return "Custom"
    if (tier.price === 0) return "Free"
    return `$${tier.price}`
  }

  function getPeriod(tier: Tier) {
    if (tier.price === null) return null
    if (tier.price === 0) return null
    return "/month"
  }

  return (
    <main className="min-h-screen grid-bg pt-24 px-4 sm:px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* ---- Hero ---- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric/10 border border-electric/20 mb-6">
            <Shield className="w-3.5 h-3.5 text-electric" />
            <span className="text-electric text-xs font-medium">Secure by default</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Simple, Transparent Pricing
          </h1>
          <p className="text-platinum/60 max-w-2xl mx-auto text-lg">
            Start free with our open-source core. Upgrade when you need cloud hosting,
            team visibility, or compliance features.
          </p>
        </div>

        {/* ---- Main Pricing Grid ---- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start pt-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-card p-6 rounded-xl flex flex-col h-full relative pt-4 overflow-visible ${
                tier.highlight ? `border-2 ${tier.borderColor || "border-electric"}` : "border-white/10"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-10 ${
                    tier.highlight
                      ? "bg-electric text-obsidian"
                      : "bg-white/10 text-platinum border border-white/20"
                  }`}
                >
                  {tier.highlight && <Sparkles className="w-3 h-3" />}
                  {tier.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-5 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className={tier.highlight ? "text-electric" : "text-platinum/60"}>
                    {tier.icon}
                  </span>
                  <h2 className="text-xl font-bold">{tier.name}</h2>
                </div>
                <p className="text-platinum/50 text-xs">{tier.targetAudience}</p>
              </div>

              {/* Description */}
              <p className="text-platinum/60 text-sm mb-5 leading-relaxed min-h-[3rem]">
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{getPrice(tier)}</span>
                  {getPeriod(tier) && (
                    <span className="text-platinum/40 text-sm">{getPeriod(tier)}</span>
                  )}
                </div>
              </div>

              {/* Limits */}
              {tier.limits && (
                <div className="mb-5">
                  {tier.limits.map((limit, i) => (
                    <p key={i} className="text-platinum/30 text-xs flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-platinum/20" />
                      {limit}
                    </p>
                  ))}
                </div>
              )}

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2 text-sm">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-platinum/20 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included ? "text-platinum/80" : "text-platinum/30 line-through"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.link}
                target={tier.link.startsWith("http") ? "_blank" : undefined}
                className="block"
              >
                <Button
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.cta}
                  {!tier.link.startsWith("http") && <ArrowRight className="w-4 h-4" />}
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* ---- Setup Service Add-on ---- */}
        <div className="mt-20 flex justify-center">
          <div className="glass-card p-8 rounded-xl max-w-3xl w-full border border-electric/30 bg-electric/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-electric/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-4 rounded-xl bg-electric/10 border border-electric/20">
                  <Wrench className="w-8 h-8 text-electric" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-platinum">{setupService.name}</h3>
                  <span className="px-2 py-1 bg-green-500/15 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                    {setupService.discount}
                  </span>
                  <span className="px-2 py-1 bg-electric/20 text-electric text-xs font-medium rounded-full border border-electric/30">
                    {setupService.scarcity}
                  </span>
                </div>

                <p className="text-platinum/60 text-sm mb-4">{setupService.description}</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-platinum/5 rounded-lg border border-white/5">
                    <Clock className="w-4 h-4 text-electric" />
                    <span className="text-sm text-platinum/80">{setupService.roi}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-platinum/5 rounded-lg border border-white/5">
                    <Headphones className="w-4 h-4 text-electric" />
                    <span className="text-sm text-platinum/80">30-day post-setup support</span>
                  </div>
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
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold">{setupService.price}</span>
                      <span className="text-platinum/50 text-sm">{setupService.period}</span>
                      <span className="text-platinum/30 text-sm line-through">{setupService.originalPrice}</span>
                    </div>
                    <p className="text-xs text-platinum/40 mt-1">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Non-refundable after session begins
                    </p>
                  </div>
                  <a href={setupService.link}>
                    <Button variant="primary" size="lg">
                      {setupService.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Feature Comparison Table ---- */}
        <div className="mt-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-3">Feature Comparison</h2>
            <p className="text-platinum/50 text-sm">
              See exactly what&apos;s included in every plan.
            </p>
          </div>

          {!showComparison ? (
            <div className="text-center">
              <button
                onClick={() => setShowComparison(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-platinum/70 hover:text-platinum hover:bg-white/10 transition-colors text-sm font-medium cursor-pointer"
              >
                <BarChart3 className="w-4 h-4" />
                Show Full Comparison Table
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="glass-card rounded-xl overflow-hidden border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-obsidian/80 border-b border-white/10">
                  <tr>
                    <th className="p-4 text-platinum/50 font-medium text-xs uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    <th className="p-4 text-center text-platinum/50 font-medium text-xs uppercase tracking-wider">
                      Community
                    </th>
                    <th className="p-4 text-center text-platinum/50 font-medium text-xs uppercase tracking-wider">
                      Starter
                    </th>
                    <th className="p-4 text-center text-electric font-medium text-xs uppercase tracking-wider bg-electric/5">
                      Pro
                    </th>
                    <th className="p-4 text-center text-platinum/50 font-medium text-xs uppercase tracking-wider">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonCategories.map((cat, catIdx) => (
                    <>
                      {/* Category Header */}
                      <tr key={`cat-${catIdx}`}>
                        <td
                          colSpan={5}
                          className="p-3 bg-white/[0.02] border-b border-white/5 border-t border-white/5 text-xs font-semibold text-platinum/40 uppercase tracking-wider"
                        >
                          {cat.category}
                        </td>
                      </tr>
                      {/* Features */}
                      {cat.features.map((feature, fIdx) => (
                        <tr
                          key={`${catIdx}-${fIdx}`}
                          className="border-b border-white/5 hover:bg-white/[0.01]"
                        >
                          <td className="p-3.5 text-platinum/70 text-sm">{feature.name}</td>
                          {(["community", "starter", "pro", "enterprise"] as const).map((plan) => {
                            const val = feature[plan]
                            return (
                              <td key={plan} className="p-3.5 text-center">
                                {typeof val === "boolean" ? (
                                  val ? (
                                    <Check className="w-4 h-4 text-electric mx-auto" />
                                  ) : (
                                    <X className="w-4 h-4 text-platinum/15 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-platinum/50 text-xs font-medium">{val}</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ---- FAQ Section ---- */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-platinum/50 text-center text-sm mb-10">
            Everything you need to know about QuiGuard pricing and plans.
          </p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="glass-card p-5 rounded-lg cursor-pointer group"
              >
                <summary className="flex items-center justify-between text-platinum/90 font-medium list-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-platinum/30 shrink-0 ml-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-platinum/50 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ---- Bottom CTA ---- */}
        <div className="mt-24 text-center">
          <div className="glass-card p-10 rounded-xl max-w-2xl mx-auto border border-electric/20 bg-electric/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-electric/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <Shield className="w-10 h-10 text-electric mx-auto mb-4" />
              <h3 className="text-2xl font-bold gradient-text mb-3">Still deciding?</h3>
              <p className="text-platinum/50 text-sm mb-6 max-w-md mx-auto">
                Start with our open-source Community plan — it&apos;s free forever.
                Upgrade when your team needs cloud hosting, visibility, or compliance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://github.com/somegg90-blip/QuiGuard-gateway"
                  target="_blank"
                >
                  <Button variant="primary">
                    <Globe className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="secondary">Talk to Sales</Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Trust Signals ---- */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-platinum/30 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span>SOC 2 Compliant Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MIT Licensed Core</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>DPA Included (Pro+)</span>
          </div>
        </div>
      </div>
    </main>
  )
}
