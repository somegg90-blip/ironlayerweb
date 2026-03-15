export default function TermsPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-3xl mx-auto glass-card p-12 rounded-xl">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Terms of Service</h1>
        
        <div className="space-y-6 text-sm text-platinum/70 leading-relaxed">
          <p><strong className="text-platinum">Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-platinum pt-4">1. Open Source License</h2>
          <p>The core IronLayer software is provided under the MIT License. You are free to use, modify, and distribute the software in accordance with that license.</p>

          <h2 className="text-xl font-semibold text-platinum pt-4">2. Disclaimer</h2>
          <p>The Service is provided "as is" without any warranties, express or implied. We do not guarantee that the software will detect all instances of PII or prevent all data leaks.</p>
        </div>
      </div>
    </main>
  )
}