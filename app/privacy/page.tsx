export default function PrivacyPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-3xl mx-auto glass-card p-12 rounded-xl">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm text-platinum/70 leading-relaxed">
          <p><strong className="text-platinum">Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-platinum pt-4">1. Data Handling</h2>
          <p>We do not store or process your AI prompts on our servers in the hosted version unless explicitly agreed upon for diagnostic purposes. All data processing happens within your own infrastructure (Self-Hosted) or in-memory during the proxy pass.</p>

          <h2 className="text-xl font-semibold text-platinum pt-4">2. Contact Information</h2>
          <p>Contact information collected via forms is used solely for business inquiries and is not sold to third parties.</p>
        </div>
      </div>
    </main>
  )
}