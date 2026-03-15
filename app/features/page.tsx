import { Card } from "@/components/ui/Card"
import { Shield, Lock, Zap, Ban, Route, Database } from "lucide-react"

const features = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "PII & IP Scrubbing",
    description: "Automatically detect and redact sensitive data like emails, phones, credit cards, and SSNs using Microsoft Presidio. Define custom regex for internal project names and API keys."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Agent Guardrails",
    description: "Prevent AI agents from going rogue. Block dangerous actions like 'DROP TABLE' or 'DELETE' commands before they ever reach your production database."
  },
  {
    icon: <Route className="w-6 h-6" />,
    title: "Smart Model Routing",
    description: "Stop overpaying for simple tasks. Our router automatically sends complex logic queries to powerful reasoning models (Nemotron) and simple chats to fast, cheap models."
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "Domain Blocking",
    description: "Enforce data sovereignty. Prevent prompts from containing competitor domains or unauthorized internal URLs to stop accidental data exfiltration."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Round-Trip Restoration",
    description: "The AI sees scrubbed data (`<EMAIL_123>`), but the user sees the real data. The process is seamless and invisible to the end-user."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Self-Hosted & Air-Gapped",
    description: "Run IronLayer entirely within your own VPC. Your data never touches our servers. Perfect for high-compliance industries like Finance and Healthcare."
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
            <Card 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </main>
  )
}