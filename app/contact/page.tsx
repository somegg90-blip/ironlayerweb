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
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Get in Touch</h1>
          <p className="text-platinum/60">Have a question? We are here to help.</p>
        </div>

        <div className="glass-card p-8 rounded-xl border border-white/10">
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2 text-electric">Message Received</h3>
              <p className="text-platinum/60">Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
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
              <div>
                <label className="block text-sm font-medium text-platinum/80 mb-2">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  required
                  suppressHydrationWarning
                  className="w-full bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-platinum focus:outline-none focus:border-electric transition-colors resize-none"
                  placeholder="Tell us about your security needs..."
                ></textarea>
              </div>
              <Button type="submit" variant="primary" disabled={loading} className="w-full py-4">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}