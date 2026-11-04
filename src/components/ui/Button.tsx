import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: ReactNode
}

export function Button({
  children,
  variant = 'primary',
  icon,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ${className}`}
      {...props}
    >
      {icon && <span className="ui-button__icon">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}
