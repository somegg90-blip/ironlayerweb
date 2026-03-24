'use client'
import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="relative bg-obsidian border border-white/10 rounded-lg p-4 my-4 overflow-x-auto">
      <button onClick={handleCopy} className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded transition-colors text-platinum/50 hover:text-platinum">
        {copied ? <Check className="w-4 h-4 text-electric" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="text-sm text-electric font-mono whitespace-pre">{children}</pre>
    </div>
  )
}

export default function DocsPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-platinum/60">Get QuiGuard running in your environment in under 5 minutes.</p>
        </div>

        <div className="glass-card p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-electric" /> Quick Start
          </h2>
          <p className="text-platinum/80 mb-4 text-sm">The fastest way to get started is using Docker.</p>
          <h3 className="text-lg font-medium mb-2 text-platinum">1. Clone & Configure</h3>
          <CodeBlock>{`git clone https://github.com/somegg90-blip/QuiGuard-gateway.git\ncd QuiGuard-gateway\necho "API_KEY=your_openrouter_key" > .env`}</CodeBlock>
          <h3 className="text-lg font-medium mb-2 mt-6 text-platinum">2. Run</h3>
          <CodeBlock>{`docker-compose up -d`}</CodeBlock>
          <p className="text-platinum/60 text-sm mt-4">Your proxy is now running at <span className="text-electric font-mono">http://localhost:8000</span>.</p>
        </div>

        <div className="glass-card p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <p className="text-platinum/80 mb-4 text-sm">All security rules are defined in <span className="text-electric font-mono">policy.yaml</span>.</p>
          <CodeBlock>{`# policy.yaml\naction_mode: "mask"\nplaceholder_format:\n  mode: "numeric"`}</CodeBlock>
        </div>
      </div>
    </main>
  )
}
