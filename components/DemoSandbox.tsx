"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Shield, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export function DemoSandbox() {
  const [input, setInput] = useState(
    "Hi, I'm John Doe. My email is john@apple.com, phone is 555-0199, SSN is 123-45-6789, and card is 4532-1234-5678-9012."
  )
  const [output, setOutput] = useState("")
  const [isScrubbed, setIsScrubbed] = useState(false)
  const [detectedTypes, setDetectedTypes] = useState<string[]>([])

  const handleScrub = () => {
    const detected: string[] = []
    
    // Simple regex simulation for the demo with detection tracking
    let scrubbed = input
    
    // Email detection
    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(scrubbed)) {
      detected.push("Email")
      scrubbed = scrubbed.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "<EMAIL_REDACTED>")
    }
    
    // Phone detection (US formats: 555-0199, (555) 019-9000, 555.019.9000, +1 555 019 9000)
    if (/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed)) {
      detected.push("Phone")
      scrubbed = scrubbed.replace(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, "<PHONE_REDACTED>")
    }
    
    // SSN detection (XXX-XX-XXXX format)
    if (/\b\d{3}-\d{2}-\d{4}\b/.test(scrubbed)) {
      detected.push("SSN")
      scrubbed = scrubbed.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "<SSN_REDACTED>")
    }
    
    // Credit card detection (16 digits with optional dashes/spaces)
    if (/\b\d{4}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4}\b/.test(scrubbed)) {
      detected.push("Credit Card")
      scrubbed = scrubbed.replace(/\b\d{4}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4}\b/g, "<CARD_REDACTED>")
    }
    
    // IP Address detection
    if (/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(scrubbed)) {
      detected.push("IP Address")
      scrubbed = scrubbed.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "<IP_REDACTED>")
    }
    
    // API Key pattern (common formats: sk-..., ghp_..., etc.)
    if (/\b(?:sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{36,}|AIza[a-zA-Z0-9_-]{35})\b/.test(scrubbed)) {
      detected.push("API Key")
      scrubbed = scrubbed.replace(/\b(?:sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{36,}|AIza[a-zA-Z0-9_-]{35})\b/g, "<API_KEY_REDACTED>")
    }
    
    setDetectedTypes(detected)
    setOutput(scrubbed)
    setIsScrubbed(true)
  }

  const handleReset = () => {
    setIsScrubbed(false)
    setOutput("")
    setDetectedTypes([])
  }

  return (
    <div className="glass-card p-8 rounded-xl border border-white/10 relative overflow-hidden" role="region" aria-label="Interactive PII scrubbing demo">
      <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-electric/10 border border-electric/20" aria-hidden="true">
            <Shield className="w-5 h-5 text-electric" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-platinum">Live PII Scrubbing Demo</h3>
            <p className="text-xs text-platinum/50">See IronLayer detect & redact sensitive data in real-time</p>
          </div>
        </div>

        {!isScrubbed ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="demo-input" className="block text-sm font-medium text-platinum/70 mb-2">
                Input Prompt (contains PII)
              </label>
              <textarea 
                id="demo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors resize-none text-sm font-mono"
                placeholder="Type text containing emails, phones, SSNs, credit cards..."
                aria-describedby="demo-input-hint"
              />
              <p id="demo-input-hint" className="mt-2 text-xs text-platinum/40">
                Try: emails, phones (555-0199), SSNs (123-45-6789), credit cards (4532-1234-5678-9012)
              </p>
            </div>
            <Button onClick={handleScrub} variant="primary" className="w-full group" aria-label="Scrub PII from input text">
              Sanitize & Redact PII
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Detection Summary */}
            <div className="flex flex-wrap gap-2">
              {detectedTypes.map((type) => (
                <span 
                  key={type}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium"
                >
                  <CheckCircle className="w-3 h-3" aria-hidden="true" />
                  {type} Detected
                </span>
              ))}
              {detectedTypes.length === 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" />
                  No PII Detected
                </span>
              )}
            </div>

            {/* Sanitized Output */}
            <div>
              <label className="block text-sm font-medium text-green-400 mb-2">Sanitized Output</label>
              <div 
                className="w-full bg-obsidian border border-green-500/30 rounded-lg px-4 py-3 text-green-300 text-sm min-h-[100px] font-mono whitespace-pre-wrap"
                role="status"
                aria-live="polite"
              >
                {output || "<Nothing to display>"}
              </div>
            </div>
            
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-electric/5 border border-electric/10">
              <Shield className="w-4 h-4 text-electric" aria-hidden="true" />
              <p className="text-xs text-platinum/60">
                <strong className="text-electric">IronLayer Proxy:</strong> Real data never leaves your infrastructure.
              </p>
            </div>
            
            <Button onClick={handleReset} variant="secondary" className="w-full group" aria-label="Reset demo and try again">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Try Another Example
            </Button>
          </div>
        )}
        
        {/* AEO Microcopy: What This Demo Shows */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-xs text-platinum/40 text-center">
            <strong className="text-platinum/60">Demo Note:</strong> This client-side simulation shows IronLayer's PII detection patterns. 
            In production, scrubbing happens server-side via the proxy with enterprise-grade NLP, custom regex, and policy enforcement.
          </p>
        </div>
      </div>
    </div>
  )
}