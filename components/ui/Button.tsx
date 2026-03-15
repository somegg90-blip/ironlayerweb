import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-electric text-obsidian hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95",
    secondary: "border border-electric/50 text-electric hover:bg-electric/10",
    ghost: "text-platinum/70 hover:text-platinum hover:bg-white/5"
  };

  return (
    <button 
      className={twMerge(clsx(baseStyles, variants[variant], className))} 
      suppressHydrationWarning 
      {...props}
    >
      {children}
    </button>
  )
}