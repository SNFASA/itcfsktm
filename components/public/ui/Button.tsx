import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'warning' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  className?: string
  onClick?: () => void
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  onClick 
}: Readonly<ButtonProps>) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-inter font-normal transition-colors'
  
  const variantClasses = {
    primary: 'bg-primary text-white border border-black hover:bg-primary/90',
    warning: 'bg-warning text-danger border border-gray-200 hover:bg-warning/90',
    secondary: 'bg-light-gray text-black border border-gray-200 hover:bg-gray-100'
  }
  
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-3 py-3 text-card-body',
    large: 'px-6 py-4 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
