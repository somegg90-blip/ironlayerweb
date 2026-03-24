'use client'
import { useState } from "react"
import { Button } from "@/components/ui/Button"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      alert("Error submitting form. Please try again.")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen grid-bg pt-24 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Let's Secure Your Agents</h1>
          <p className="text-platinum/60">Tell us about your setup. We'll help you lock it down.</p>
        </div>

        <div className="glass-card p-8 rounded-xl border border-white/10">
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2 text-electric">Request Received</h3>
              <p className="text-platinum/60 mb-6">Thanks for the details. You can now book a time slot directly.</p>
              
              <a 
                href="https://calendly.com/medicalpremed/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full"
              >
                <Button variant="primary" className="w-full">
                  Book a Time Slot
                </Button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors"
                  placeholder="Jane Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">Work Email</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors"
                  placeholder="jane@company.com"
                />
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">Company Size</label>
                <select 
                  name="company_size"
                  required
                  defaultValue="" // FIXED: Use defaultValue here
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors appearance-none"
                >
                  <option value="" disabled>Select size</option>
                  <option value="1-10">1-10 (Startup)</option>
                  <option value="11-50">11-50 (Growing)</option>
                  <option value="51-200">51-200 (Mid-Market)</option>
                  <option value="200+">200+ (Enterprise)</option>
                </select>
              </div>

              {/* Agent Count */}
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">How many AI Agents are you running?</label>
                <select 
                  name="agent_count"
                  required
                  defaultValue="" // FIXED: Use defaultValue here
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors appearance-none"
                >
                  <option value="" disabled>Select range</option>
                  <option value="0">None (Just Planning)</option>
                  <option value="1-5">1-5 (Experimenting)</option>
                  <option value="6-20">6-20 (Scaling)</option>
                  <option value="20+">20+ (Production)</option>
                </select>
              </div>

              {/* Data Types */}
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">What data types are you handling?</label>
                <input 
                  name="data_types"
                  type="text" 
                  required
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors"
                  placeholder="e.g., Customer PII, Financial Logs, Medical Records"
                />
              </div>

              {/* Challenge */}
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">Biggest Security Fear?</label>
                <textarea 
                  name="challenge"
                  rows={3}
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors resize-none"
                  placeholder="e.g., Agents leaking API keys to logs..."
                ></textarea>
              </div>

              <Button type="submit" variant="primary" disabled={loading} className="w-full py-4">
                {loading ? "Submitting..." : "Request Consultation"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
