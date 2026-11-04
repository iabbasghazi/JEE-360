import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: 'purple' | 'green' | 'blue' | 'neutral'
}

export function Badge({ children, tone = 'purple' }: BadgeProps) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>
}
