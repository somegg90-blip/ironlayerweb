import React from 'react'

export const Card = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center mb-4 text-electric">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-platinum">{title}</h3>
        <p className="text-platinum/60 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
