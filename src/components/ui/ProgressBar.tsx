type ProgressBarProps = {
  value: number
  label?: string
  showValue?: boolean
}

export function ProgressBar({
  value,
  label,
  showValue = true,
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value))

  return (
    <div className="progress-component">
      {(label || showValue) && (
        <div className="progress-component__meta">
          {label && <span>{label}</span>}
          {showValue && <span>{safeValue}%</span>}
        </div>
      )}

      <div
        className="progress-track"
        role="progressbar"
        aria-label={label || 'Progress'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div
          className="progress-fill"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}
