import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DemoSandbox } from "@/components/DemoSandbox"; // ✅ Added DemoSandbox import
import { Shield, Zap, Lock, ArrowRight, Github, Database, Cpu, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

// AEO-Optimized FAQ Data with Schema-Ready Structure
const faqs = [
  {
    question: "What is QuiGuard?",
    answer: "QuiGuard is a self-hosted AI security proxy that automatically scrubs PII (personally identifiable information) from prompts, responses, and tool calls before data leaves your network. It acts as a zero-trust gatekeeper for AI agent communications."
  },
  {
    question: "How does QuiGuard protect AI agent data?",
    answer: "QuiGuard operates as a reverse proxy between your application and LLM providers. It intercepts all traffic, redacts sensitive data using pattern matching and NLP, enforces guardrails on tool usage, and logs audit trails—all without storing your raw data."
  },
  {
    question: "Is QuiGuard compliant with GDPR, HIPAA, or SOC 2?",
    answer: "Yes. QuiGuard is designed to help you meet compliance requirements by preventing PII exposure at the source. Self-hosted deployments keep all data and logs within your infrastructure. Cloud deployments process data in-memory only and never store raw PII."
  },
  {
    question: "Can I use QuiGuard with any LLM provider?",
    answer: "QuiGuard is provider-agnostic. It works with OpenAI, Anthropic, Google Vertex, Azure OpenAI, and any OpenAI-compatible API endpoint via standard HTTP proxy configuration."
  },
  {
    question: "How do I deploy QuiGuard?",
    answer: "Deploy in under 5 minutes using Docker: `docker run -p 3000:3000 QuiGuard/gateway`. Configure your AI application to route requests through `http://localhost:3000`. No code changes required beyond endpoint redirection."
  },
  {
    question: "What types of PII does QuiGuard detect and scrub?",
    answer: "QuiGuard detects and redacts emails, phone numbers, credit cards, SSNs, IP addresses, API keys, custom regex patterns, and context-aware entities like names + addresses. Custom detectors can be added via configuration."
  }
];

// Generate FAQ Schema JSON-LD
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

// SoftwareApplication Schema for Rich Snippets
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QuiGuard",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Linux, macOS, Windows (via Docker)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Open-source core available free. Enterprise features via paid plans."
  },
  "description": "Self-hosted AI security proxy that scrubs PII from prompts, responses, and tool calls. Protect enterprise data before it reaches external LLMs.",
  "featureList": [
    "PII scrubbing for prompts and tool arguments",
    "Agent guardrails and action blocking",
    "Audit logs with compliance-ready exports",
    "Self-hosted or cloud deployment options",
    "Provider-agnostic API proxy"
  ],
  "softwareVersion": "1.0",
  "downloadUrl": "https://github.com/somegg90-blip/QuiGuard-gateway",
  "license": "MIT"
};

// Organization Schema for Brand Authority
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QuiGuard",
  "url": "https://QuiGuard.dev",
  "logo": "https://QuiGuard.dev/logo.png",
  "sameAs": [
    "https://github.com/somegg90-blip/QuiGuard-gateway"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "sales@QuiGuard.dev"
  }
};

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary SEO Meta Tags */}
        <title>QuiGuard | Self-Hosted AI Security Proxy for PII Scrubbing & Agent Guardrails</title>
        <meta name="description" content="QuiGuard is the zero-trust security proxy for AI agents. Automatically scrub PII from prompts, responses, and tool calls. Self-hosted or cloud. Deploy in 5 minutes. GDPR, HIPAA ready." />
        <meta name="keywords" content="AI security, PII scrubbing, AI proxy, agent guardrails, enterprise AI compliance, self-hosted AI, LLM security, data privacy, GDPR AI, HIPAA AI" />
        
        {/* Open Graph / Social */}
        <meta property="og:title" content="QuiGuard | The Safety Layer For AI Agents" />
        <meta property="og:description" content="Self-hosted security proxy that scrubs PII from prompts, responses, and tool calls. Protect your data before it leaves your network." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://QuiGuard.dev" />
        <meta property="og:image" content="https://QuiGuard.dev/og-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QuiGuard | AI Security Proxy" />
        <meta name="twitter:description" content="Scrub PII, enforce guardrails, audit AI agent traffic. Zero-trust proxy for enterprise AI." />
        
        {/* Canonical & Robots */}
        <link rel="canonical" href="https://QuiGuard.dev" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <main className="min-h-screen grid-bg relative" itemScope itemType="https://schema.org/SoftwareApplication">
        {/* Schema Microdata for Core Product */}
        <meta itemProp="name" content="QuiGuard" />
        <meta itemProp="applicationCategory" content="SecurityApplication" />
        <meta itemProp="description" content="Self-hosted AI security proxy that scrubs PII from prompts, responses, and tool calls" />
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-deep/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5" role="navigation" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl font-bold" itemProp="brand" itemScope itemType="https://schema.org/Organization">
              <Shield className="w-6 h-6 text-electric" aria-hidden="true" />
              <span itemProp="name">QuiGuard</span>
              <meta itemProp="url" content="https://QuiGuard.dev" />
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-platinum/70">
              <Link href="#features" className="hover:text-platinum transition-colors" aria-label="View QuiGuard features">Features</Link>
              <Link href="#architecture" className="hover:text-platinum transition-colors" aria-label="Learn about QuiGuard security architecture">Architecture</Link>
              <Link href="#faq" className="hover:text-platinum transition-colors" aria-label="View frequently asked questions">FAQ</Link>
              <Link href="/pricing" className="hover:text-platinum transition-colors" aria-label="View QuiGuard pricing plans">Pricing</Link>
              <Link href="/docs" className="hover:text-platinum transition-colors" aria-label="Read QuiGuard documentation">Docs</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/somegg90-blip/QuiGuard-gateway" target="_blank" rel="noopener noreferrer" aria-label="View QuiGuard on GitHub">
                <Button variant="ghost" className="p-2"><Github className="w-5 h-5" /></Button>
              </Link>
              <Link href="/contact"><Button variant="secondary" aria-label="Contact QuiGuard sales team">Contact Sales</Button></Link>
            </div>
          </div>
        </nav>

        {/* Hero Section - AEO Optimized */}
        <section className="pt-40 pb-20 px-6 relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/20 bg-electric/5 text-electric text-xs font-medium mb-8 animate-pulse-slow" itemProp="softwareVersion">
              <span className="w-2 h-2 rounded-full bg-electric animate-ping" aria-hidden="true" />
              V1.0 Launched: Agent Tool Scrubbing & Audit Logs
            </div>
            
            {/* Primary H1 with Target Keywords for AEO */}
            <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight" itemProp="name">
              The Safety Layer <br/>
              <span className="gradient-text">For AI Agents.</span>
            </h1>
            
            {/* Concise Answer-Style Description for Featured Snippets */}
            <p className="text-lg md:text-xl text-platinum/60 max-w-2xl mx-auto mb-10 leading-relaxed" itemProp="description">
              QuiGuard is the self-hosted security proxy that automatically scrubs PII from prompts, responses, and tool calls. 
              <strong> Protect sensitive enterprise data before it leaves your network</strong>—with zero configuration changes to your AI stack.
            </p>
            
            {/* Primary CTAs with Clear Intent */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://github.com/somegg90-blip/QuiGuard-gateway" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-base group" itemProp="downloadUrl">
                  Deploy in 5 Mins
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/book-demo">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">
                  Book a Demo
                </Button>
              </Link>
            </div>
            
            {/* Trust Signals for Enterprise Buyers */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-platinum/50">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> GDPR Ready</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> HIPAA Compatible</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> SOC 2 Aligned</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Zero Data Retention</span>
            </div>
          </div>
        </section>

        {/* Features Section - Question-Based Headings for AEO */}
        <section id="features" className="py-24 px-6" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* AEO-Optimized H2: Answers "What security does QuiGuard provide?" */}
              <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4">
                What Security Does QuiGuard Provide for AI Agents?
              </h2>
              <p className="text-platinum/60 max-w-xl mx-auto">
                Built for developers. Ready for enterprise compliance. Three core capabilities that close critical AI security gaps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                icon={<Lock className="w-6 h-6" />}
                title="Prompt & Tool Scrubbing"
                description="Redacts PII in user prompts AND Agent tool arguments. The only solution that secures the entire loop—preventing data leaks at the source before reaching external LLMs."
              />
              <Card 
                icon={<Shield className="w-6 h-6" />}
                title="Agent Guardrails"
                description="Enforce hard boundaries on AI agent actions. Block dangerous operations (DROP TABLE, rm -rf), prevent data exfiltration to unauthorized domains, and restrict tool usage by policy."
              />
              <Card 
                icon={<Database className="w-6 h-6" />}
                title="Audit Logs & Compliance Modes"
                description="Generate compliance-ready audit trails for SOC 2, GDPR, HIPAA. Switch between Mask, Warn, or Block modes to fit your risk tolerance—with exportable logs for security reviews."
              />
            </div>
          </div>
        </section>

        {/* Architecture Section - "How It Works" for AEO */}
        <section id="architecture" className="py-24 px-6 border-t border-white/5" aria-labelledby="architecture-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {/* Direct Answer to "How does QuiGuard work?" */}
              <h2 id="architecture-heading" className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                How Does QuiGuard Protect AI Data?
              </h2>
              <p className="text-platinum/60 text-lg">
                QuiGuard uses a zero-trust proxy architecture to secure data without ever seeing your raw information.
              </p>
            </div>

            {/* Core Concept - Featured Snippet Optimized */}
            <div className="glass-card p-8 rounded-xl mb-8" itemProp="processingMethod">
              <h3 className="text-xl font-semibold mb-4 text-platinum">The Zero-Trust Proxy Model</h3>
              <p className="text-platinum/70 leading-relaxed">
                QuiGuard operates as a <strong className="text-platinum">reverse proxy</strong> between your application and any LLM provider. 
                It intercepts all traffic, redacts sensitive data using pattern matching + NLP, enforces policy guardrails, 
                and forwards only sanitized requests—ensuring <strong>no PII leaves your controlled environment</strong>.
              </p>
            </div>

            {/* Visual Data Flow - Semantic Structure for Voice Search */}
            <div className="glass-card p-8 rounded-xl mb-8" aria-label="QuiGuard data flow diagram">
              <h3 className="text-xl font-semibold mb-6 text-center text-platinum">Data Flow: From Prompt to Response</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center p-4 w-full md:w-1/4">
                  <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric" aria-hidden="true">
                    <Database className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-platinum">1. User Prompt</h4>
                  <p className="text-xs text-platinum/50 mt-1">"My email is john@secret.com"</p>
                </div>

                <ArrowRight className="hidden md:block text-platinum/20 rotate-90 md:rotate-0" aria-hidden="true" />

                {/* Step 2 - QuiGuard Processing */}
                <div className="flex flex-col items-center p-4 w-full md:w-1/4 border-x border-white/5">
                  <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric" aria-hidden="true">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-platinum">2. QuiGuard Scrubs</h4>
                  <p className="text-xs text-platinum/50 mt-1"><strong className="text-electric">REDACTS:</strong> "My email is &lt;EMAIL_1&gt;"</p>
                </div>

                <ArrowRight className="hidden md:block text-platinum/20 rotate-90 md:rotate-0" aria-hidden="true" />

                {/* Step 3 */}
                <div className="flex flex-col items-center p-4 w-full md:w-1/4">
                  <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric" aria-hidden="true">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-platinum">3. LLM Processes</h4>
                  <p className="text-xs text-platinum/50 mt-1">Receives clean data only</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-obsidian rounded-lg border border-white/5">
                <p className="text-center text-sm text-platinum/60">
                  <strong className="text-electric">Return Trip:</strong> AI replies with placeholder. QuiGuard restores original values before delivery—<span className="text-platinum">your data never exposed to third parties</span>.
                </p>
              </div>
            </div>

            {/* Deployment Options - Comparison for Decision Queries */}
            <div className="grid md:grid-cols-2 gap-6" itemProp="availableChannel" itemScope>
              <div className="glass-card p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-3 text-platinum" itemProp="name">Self-Hosted (Docker)</h4>
                <meta itemProp="deploymentType" content="On-premises" />
                <ul className="space-y-2 text-sm text-platinum/60">
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" /> 
                    <span><strong className="text-platinum">Zero Access:</strong> QuiGuard developers cannot see your traffic or logs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" /> 
                    <span><strong className="text-platinum">Local Logs:</strong> Audit trails stored on your infrastructure only.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" /> 
                    <span><strong className="text-platinum">Full Control:</strong> Customize detectors, policies, and retention rules.</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-3 text-platinum" itemProp="name">Cloud (SaaS)</h4>
                <meta itemProp="deploymentType" content="Cloud" />
                <ul className="space-y-2 text-sm text-platinum/60">
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" /> 
                    <span><strong className="text-platinum">In-Memory Only:</strong> Prompts processed in RAM and immediately discarded.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" /> 
                    <span><strong className="text-platinum">Masked Logs:</strong> Events logged (e.g., "Email Detected") but never raw PII values.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" /> 
                    <span><strong className="text-platinum">Managed Updates:</strong> Automatic security patches and detector improvements.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ✅ ADDED: Demo Sandbox Component - Interactive AEO Engagement */}
            <div className="mt-12">
              <DemoSandbox />
            </div>
            
          </div>
        </section>

        {/* AEO-Optimized FAQ Section - Critical for Answer Engines */}
        <section id="faq" className="py-24 px-6 border-t border-white/5" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions About AI Security
              </h2>
              <p className="text-platinum/60">
                Direct answers to common questions about QuiGuard, AI data protection, and enterprise compliance.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details 
                  key={index} 
                  className="glass-card p-6 rounded-xl group"
                  itemScope 
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-platinum pr-4" itemProp="name">
                      {faq.question}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-platinum/40 transition-transform group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <div className="mt-4 text-platinum/70 leading-relaxed" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Additional AEO Content: "Why Choose QuiGuard" Comparison */}
            <div className="mt-16 glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center text-platinum">
                Why Security Teams Choose QuiGuard
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-platinum/70">
                <div>
                  <h4 className="font-semibold text-platinum mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-electric" /> 
                    Before QuiGuard
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>PII leaks through AI prompts to third-party LLMs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>No visibility into agent tool usage or data flows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>Manual compliance reviews slow AI adoption</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-platinum mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> 
                    With QuiGuard
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>Automatic PII redaction at the network edge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>Real-time audit logs for security & compliance teams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>Deploy in minutes with zero code changes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Intent-Optimized */}
        <section className="py-24 px-6 border-t border-white/5" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent pointer-events-none" aria-hidden="true" />
            <h2 id="cta-heading" className="text-3xl font-bold mb-4">
              Ready to Secure Your AI Stack?
            </h2>
            <p className="text-platinum/60 mb-8">
              Join enterprise teams using QuiGuard to deploy AI agents with confidence. 
              Start free with open-source, or schedule a pilot for advanced compliance features.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/pricing">
                <Button variant="primary" className="px-8" aria-label="View QuiGuard pricing and plans">
                  View Pricing
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="px-8" aria-label="Contact QuiGuard for enterprise demo">
                  Contact Us
                </Button>
              </Link>
              <Link href="https://github.com/somegg90-blip/QuiGuard-gateway" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="px-8" aria-label="View QuiGuard source code on GitHub">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer - Semantic & SEO Optimized */}
        <footer className="py-12 px-6 border-t border-white/5" role="contentinfo">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-platinum/40 text-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-0" itemScope itemType="https://schema.org/Organization">
              <Shield className="w-4 h-4 text-electric" aria-hidden="true" /> 
              <span itemProp="name">© 2026 QuiGuard. All rights reserved.</span>
              <meta itemProp="url" content="https://QuiGuard.dev" />
            </div>
            <div className="flex gap-6" role="navigation" aria-label="Footer navigation">
              <Link href="/privacy" className="hover:text-platinum transition-colors" aria-label="Read QuiGuard privacy policy">Privacy</Link>
              <Link href="/terms" className="hover:text-platinum transition-colors" aria-label="Read QuiGuard terms of service">Terms</Link>
              <Link href="/security" className="hover:text-platinum transition-colors" aria-label="View QuiGuard security practices">Security</Link>
              <Link href="/docs" className="hover:text-platinum transition-colors" aria-label="Read QuiGuard documentation">Docs</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
