import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Zap, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-deep/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Shield className="w-6 h-6 text-electric" />
            <span>IronLayer</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-platinum/70">
            <Link href="/features" className="hover:text-platinum transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-platinum transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-platinum transition-colors">Docs</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/somegg90-blip/ironlayer-gateway" target="_blank">
              <Button variant="ghost" className="p-2">
                <Github className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact"><Button variant="secondary">Contact Sales</Button></Link>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/20 bg-electric/5 text-electric text-xs font-medium mb-8 animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-electric animate-ping" />
            V2 is Live: Smart Routing & Agent Guardrails
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            The Security Layer <br/>
            <span className="gradient-text">For Generative AI.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-platinum/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            An enterprise-grade API gateway that redacts PII, enforces policies, and prevents data leaks before they reach external LLMs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://github.com/somegg90-blip/ironlayer-gateway" target="_blank">
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-base group">
                Deploy in 5 Mins
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/book-demo">
              <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 relative w-full max-w-5xl mx-auto h-80 rounded-xl border border-white/10 glass-card overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <div className="w-32 h-32 border border-electric/50 rounded-full animate-spin flex items-center justify-center" style={{animationDuration: "10s"}}>
                    <Shield className="w-12 h-12 text-electric" />
                </div>
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Security, Developer Experience</h2>
            <p className="text-platinum/60 max-w-xl mx-auto">
              Plug-and-play security infrastructure that scales with your AI operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              icon={<Lock className="w-6 h-6" />}
              title="PII & IP Scrubbing"
              description="Automatically detect and redact emails, credit cards, and custom project names using context-aware analysis."
            />
            <Card 
              icon={<Shield className="w-6 h-6" />}
              title="Agent Guardrails"
              description="Block dangerous actions and data exfiltration. Prevent 'Prompt Injection' attacks before they happen."
            />
            <Card 
              icon={<Zap className="w-6 h-6" />}
              title="Smart Routing"
              description="Automatically route complex queries to powerful models and simple tasks to fast ones to optimize costs."
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold mb-4">Ready to secure your AI stack?</h2>
          <p className="text-platinum/60 mb-8">Get started with the open-source core or schedule a pilot for your team.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing">
              <Button variant="primary" className="px-8">View Pricing</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="px-8">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-platinum/40 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-4 h-4 text-electric" /> 
            <span>© 2026 IronLayer. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-platinum transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-platinum transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}