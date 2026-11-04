import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  glow?: boolean
}

export function Card({
  children,
  glow = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`ui-card ${glow ? 'ui-card--glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
