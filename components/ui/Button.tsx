import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg'; // ADDED THIS LINE
}

export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) => {
  const baseStyles = "rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  
  // ADDED SIZE STYLES
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  }

  const variants = {
    primary: "bg-electric text-obsidian hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95",
    secondary: "border border-electric/50 text-electric hover:bg-electric/10",
    ghost: "text-platinum/70 hover:text-platinum hover:bg-white/5"
  };

  return (
    <button 
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} 
      suppressHydrationWarning 
      {...props}
    >
      {children}
    </button>
  )
}
