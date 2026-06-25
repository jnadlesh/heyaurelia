import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/utils'

interface SectionProps {
  /** Mono eyebrow above the heading (e.g. "Now", "Next"). */
  eyebrow?: string
  title: string
  /** Optional one-line muted lead under the title. */
  lead?: string
  children: ReactNode
  className?: string
  /** Roadmap row may widen; prose stays narrow. */
  width?: 'prose' | 'wide'
}

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className,
  width = 'prose',
}: SectionProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className={cn(
        'reveal mx-auto w-full px-6 py-20 md:py-28',
        width === 'wide' ? 'max-w-5xl' : 'max-w-3xl',
        className,
      )}
    >
      <header className="mb-8 md:mb-10">
        {eyebrow ? (
          <p className="mb-3 font-mono text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-[28px] font-semibold tracking-[-0.03em] md:text-[32px]">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {lead}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  )
}
