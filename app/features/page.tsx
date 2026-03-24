import { Card } from "@/components/ui/Card"
import { Shield, Lock, Zap, Ban, Route, Database } from "lucide-react"

const features = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Prompt & Tool Scrubbing",
    description: "The only proxy that sanitizes both user prompts AND Agent tool arguments. Prevents agents from leaking data via API calls."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Agent Guardrails",
    description: "Prevent AI agents from going rogue. Block dangerous actions like 'DROP TABLE' or 'DELETE' commands before they ever reach your production database."
  },
  {
    icon: <Route className="w-6 h-6" />,
    title: "Smart Model Routing",
    description: "Stop overpaying for simple tasks. Our router automatically sends complex logic queries to powerful models and simple chats to fast models."
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "Policy Modes (Mask/Warn/Block)",
    description: "Choose your security posture. Mask sensitive data, Warn the user, or Block the request entirely if sensitive data is detected."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Audit Logs & Compliance",
    description: "Generate JSON audit trails of every blocked or scrubbed item. Essential for GDPR, HIPAA, and SOC2 compliance."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Self-Hosted & Air-Gapped",
    description: "Run QuiGuard entirely within your own VPC. Your data never touches our servers. Perfect for high-compliance industries."
  }
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Enterprise Security Infrastructure</h1>
          <p className="text-platinum/60 max-w-2xl mx-auto">
            A comprehensive suite of tools designed to secure your AI operations without sacrificing speed or developer experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </main>
  )
}
