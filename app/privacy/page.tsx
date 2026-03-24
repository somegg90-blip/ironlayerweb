export default function PrivacyPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-3xl mx-auto glass-card p-12 rounded-xl">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Privacy Policy</h1>
        <p className="text-sm text-platinum/50 mb-8">Last Updated: March 20, 2026</p>

        <div className="space-y-6 text-sm text-platinum/70 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">1. Introduction</h2>
            <p>QuiGuard ("we") respects your privacy. This policy explains how we collect, use, and protect information when you visit our website or use our Cloud Services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">2. Data Processing Architecture</h2>
            <p>We operate under a Privacy-First Architecture. Our data handling differs based on how you use QuiGuard:</p>
            
            <div className="mt-4 p-4 bg-obsidian/50 rounded-lg border border-white/10">
              <h3 className="font-semibold text-electric mb-2">2.1 Self-Hosted Version (Docker)</h3>
              <p><strong>Data Flow:</strong> When you self-host QuiGuard, no AI prompts, user data, or PII leaves your infrastructure.</p>
              <p className="mt-2"><strong>Our Access:</strong> QuiGuard developers have <strong>zero access</strong> to your traffic, logs, or data.</p>
            </div>

            <div className="mt-4 p-4 bg-obsidian/50 rounded-lg border border-white/10">
              <h3 className="font-semibold text-electric mb-2">2.2 Cloud Version (SaaS)</h3>
              <p><strong>Transient Processing:</strong> Data passes through our proxy in-memory and is not persisted to disk unless required for Audit Logs.</p>
              <p className="mt-2"><strong>Audit Logs:</strong> We store metadata (timestamp, status). Sensitive values are automatically masked before logging.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">3. Information We Collect</h2>
            <p>We collect Business Contact Information (Name, Email, Company) solely for business communication and invoicing. We do not sell this data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">4. Data Security</h2>
            <p>We implement industry-standard security measures (encryption in transit, access controls) to protect your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">5. Contact Us</h2>
            <p>For privacy questions, contact: <a href="mailto:privacy@QuiGuard.com" className="text-electric hover:underline">banjarapadam62@gmail.com</a></p>
          </section>
        </div>
      </div>
    </main>
  )
}
