import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

export default function BookDemoPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-5xl mx-auto">
        
        <Link 
          href="/" 
          className="inline-flex items-center text-platinum/60 hover:text-electric mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> 
          Back to Home
        </Link>
        
        <div className="glass-card p-8 rounded-xl mb-8 border border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 rounded-lg bg-electric/10 border border-electric/20">
              <Calendar className="w-6 h-6 text-electric" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1 gradient-text">Book a Technical Pilot</h1>
              <p className="text-platinum/60">Schedule a 30-minute call to configure IronLayer for your specific security needs.</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden h-[800px] border border-white/5 relative">
          
          <div className="absolute inset-0 bg-smoke flex items-center justify-center pointer-events-none z-0">
             <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div className="w-32 h-4 bg-white/10 rounded" />
             </div>
          </div>

          <iframe 
            src="https://calendly.com/medicalpremed/30min"
            width="100%" 
            height="100%" 
            frameBorder="0"
            title="Schedule a Demo with IronLayer"
            className="relative z-10 bg-obsidian"
          ></iframe>
        </div>

      </div>
    </main>
  )
}