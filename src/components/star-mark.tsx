interface StarMarkProps {
  className?: string
  size?: number
}

/**
 * A small, flat 8-point star in the accent gold. No glow, no animation.
 * Used inline next to the wordmark.
 */
export function StarMark({ className, size = 22 }: StarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 0c.55 5.9 2.3 7.65 8.2 8.2-5.9.55-7.65 2.3-8.2 8.2-.55-5.9-2.3-7.65-8.2-8.2C9.7 7.65 11.45 5.9 12 0Z"
        fill="#E0A23B"
      />
      <path
        d="M19.6 13.4c.27 2.85 1.15 3.73 4 4-2.85.27-3.73 1.15-4 4-.27-2.85-1.15-3.73-4-4 2.85-.27 3.73-1.15 4-4Z"
        fill="#E0A23B"
      />
    </svg>
  )
}
