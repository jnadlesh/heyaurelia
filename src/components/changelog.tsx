import { Fragment } from 'react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { ChangelogEntry } from '@/content'

const LABEL_ORDER: Record<string, number> = { New: 0, Improved: 1, Fixed: 2 }

function ChangelogRow({ entry }: { entry: ChangelogEntry }) {
  const items = entry.items
    ? [...entry.items].sort(
        (a, b) => LABEL_ORDER[a.label] - LABEL_ORDER[b.label],
      )
    : []

  return (
    <article className="grid gap-6 md:grid-cols-[160px_1fr]">
      <p className="font-mono text-[13px] font-medium text-muted-foreground md:pt-1">
        {entry.date}
      </p>
      <div>
        <h3 className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.01em]">
          {entry.title}
          {entry.beta ? (
            <span className="font-mono text-[12px] font-normal text-muted-foreground">
              (beta)
            </span>
          ) : null}
        </h3>
        <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
          {entry.description}
        </p>
        {items.length > 0 ? (
          <ul className="mt-4 space-y-2.5">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-[15px] leading-relaxed text-muted-foreground"
              >
                <span className="font-semibold text-foreground">
                  {item.label}
                </span>{' '}
                {item.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

export function Changelog({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div>
      {entries.map((entry, i) => (
        <Fragment key={entry.title}>
          {i > 0 ? <Separator className="my-10" /> : null}
          <ChangelogRow entry={entry} />
        </Fragment>
      ))}
    </div>
  )
}

/** Single muted secondary badge — used only for genuinely ambiguous states. */
export function StateBadge({ children }: { children: string }) {
  return (
    <Badge
      variant="outline"
      className="rounded-md px-2 font-mono text-[11px] font-normal tracking-wide text-muted-foreground"
    >
      {children}
    </Badge>
  )
}
