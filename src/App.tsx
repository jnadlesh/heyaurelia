import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import type { Item, ChangeEntry } from '@/content'
import {
  finishedItems,
  inProgressItems,
  nextItems,
  plannedItems,
  changelogItems,
} from '@/content'

const SUMMARY =
  'Aurelia is an AI agent that grows with you. It keeps a memory of your work, learns how you like things done, and takes the busywork of your day off your hands. The more you use it, the more it handles. This page lays out what it can do today, and where it is headed.'

const cleanScroll =
  '[scrollbar-color:rgba(255,255,255,0.16)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/25'

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = () => setMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        'shrink-0 text-muted-foreground transition-transform duration-300 ease-out motion-reduce:transition-none',
        open && 'rotate-180',
      )}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CountBadge({ n }: { n: number }) {
  return (
    <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none text-muted-foreground">
      {n}
    </span>
  )
}

/** The expanded body of a card: its own line, then any stacked children. */
function CardBody({ item }: { item: Item }) {
  const kids = item.children ?? []
  return (
    <div>
      {item.description ? (
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      ) : null}
      {kids.length > 0 ? (
        <ul
          className={cn(
            'space-y-3.5',
            item.description && 'mt-4 border-t border-border pt-4',
          )}
        >
          {kids.map((c) => (
            <li key={c.title}>
              <p className="text-[14px] font-medium tracking-[-0.01em] text-foreground">
                {c.title}
              </p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

const CardModalContext = createContext<(item: Item) => void>(() => {})

function OpenIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-muted-foreground"
    >
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A centered popup for a card with sub-features: fully on screen, scrolls cleanly. */
function CardModal({
  item,
  open,
  onClose,
}: {
  item: Item | null
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] flex items-center justify-center p-4',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      {/* Backdrop owns the fade only, matched to the panel timing. */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      {/* Panel is the single owner of slide + fade; the wrapper never touches opacity.
          Tailwind v4 emits translate-y-* as the `translate` property, so the transition
          must animate `translate` (not `transform`) or the rise snaps. */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative flex max-h-[82vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/40 transition-[translate,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <h2 className="text-[19px] font-bold leading-snug tracking-[-0.02em]">
            {item?.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className={cn(
            'overflow-y-auto px-6 py-5',
            cleanScroll,
            '[&::-webkit-scrollbar]:w-2',
          )}
        >
          {item ? <CardBody item={item} /> : null}
        </div>
      </div>
    </div>
  )
}

/** A card with sub-features opens a popup; a simple one expands in place. */
function FeatureCard({ item }: { item: Item }) {
  const openCard = useContext(CardModalContext)
  const [open, setOpen] = useState(false)
  const n = item.children?.length ?? 0

  if (n > 0) {
    return (
      <button
        type="button"
        onClick={() => openCard(item)}
        className="flex min-h-[68px] w-[244px] shrink-0 self-start items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 text-left transition-colors hover:border-foreground/20 hover:bg-foreground/[0.03] md:w-[280px]"
      >
        <span className="flex items-center gap-2 text-[15px] font-medium leading-snug tracking-[-0.01em]">
          {item.title}
          <CountBadge n={n} />
        </span>
        <OpenIcon />
      </button>
    )
  }

  return (
    <div
      className={cn(
        'relative w-[244px] shrink-0 self-start md:w-[280px]',
        open && 'z-20',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'flex min-h-[68px] w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 text-left transition-colors hover:bg-foreground/[0.03]',
          open ? 'border-primary/50' : 'border-border',
        )}
      >
        <span className="text-[15px] font-medium leading-snug tracking-[-0.01em]">
          {item.title}
        </span>
        <Chevron open={open} />
      </button>
      <div
        className={cn(
          'absolute left-0 right-0 top-[calc(100%+6px)] grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
          open
            ? 'grid-rows-[1fr] opacity-100'
            : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StageProps {
  label: string
  caption: string
  items: Item[]
  accent?: boolean
}

function Stage({ label, caption, items, accent }: StageProps) {
  return (
    <section className="flex h-full shrink-0 flex-col justify-center gap-8 px-8 sm:px-12 md:gap-10 md:px-20">
      <div>
        <h2
          className={cn(
            'text-[32px] font-bold tracking-[-0.02em] sm:text-[44px] md:text-[52px]',
            accent && 'text-primary',
          )}
        >
          {label}
        </h2>
        <p className="mt-2 font-mono text-[12px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          {caption}
        </p>
      </div>
      <div className="flex items-start">
        {items.map((it, i) => (
          <Fragment key={it.title}>
            {i > 0 ? (
              <div
                className="mt-[34px] h-px w-6 shrink-0 bg-border sm:w-8 md:w-12"
                aria-hidden="true"
              />
            ) : null}
            <FeatureCard item={it} />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

/** Shared title + click-to-reveal summary, used on desktop and mobile. */
function TitleBlock() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex flex-col items-start text-left"
      >
        <h1 className="text-[44px] font-bold leading-[0.92] tracking-[-0.035em] sm:text-[64px] md:text-[92px]">
          Aurelia
          <br />
          Roadmap
        </h1>
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-foreground">
          What is Aurelia
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={cn('transition-transform duration-300', open && 'rotate-180')}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'grid transition-all duration-500 ease-out motion-reduce:transition-none',
          open ? 'mt-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-md text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
            {SUMMARY}
          </p>
        </div>
      </div>
      <p className="mt-8 font-mono text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
        Updated June 2026
      </p>
    </div>
  )
}

function ScrollHint() {
  return (
    <p className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.2em] text-muted-foreground md:text-[14px]">
      Scroll to start
      <svg width="30" height="16" viewBox="0 0 30 16" fill="none" aria-hidden="true">
        <path
          d="M2 8h24M21 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </p>
  )
}

function IntroPanel() {
  return (
    <section className="flex h-full w-screen shrink-0 items-center">
      <div className="flex flex-1 flex-col justify-center px-12 md:px-20">
        <TitleBlock />
      </div>
      <div className="h-[68%] w-px shrink-0 bg-border" aria-hidden="true" />
      <div className="flex flex-1 items-center justify-center px-10">
        <ScrollHint />
      </div>
    </section>
  )
}

function ContactContent({ onOpenChangelog }: { onOpenChangelog: () => void }) {
  return (
    <>
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
        End of the roadmap
      </p>
      <h2 className="mt-5 text-[36px] font-bold tracking-[-0.02em] sm:text-[48px] md:text-[64px]">
        Get in contact
      </h2>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">
        Questions, or want Aurelia for your own business? Reach out any time.
      </p>
      <a
        href="mailto:contact@heyaurelia.com"
        className="mt-9 inline-flex items-center rounded-full bg-primary px-7 py-4 text-[16px] font-semibold text-black transition hover:opacity-90"
      >
        contact@heyaurelia.com
      </a>
      <button
        type="button"
        onClick={onOpenChangelog}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        View the changelog
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  )
}

function DesktopRoadmap({ onOpenChangelog }: { onOpenChangelog: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    el.scrollLeft = 0

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const EASE = 0.075
    const SPEED = 1.3
    let current = el.scrollLeft
    let target = current
    let running = false
    let lastT = 0
    let raf = 0
    const maxLeft = () => el.scrollWidth - el.clientWidth

    const frame = (t: number) => {
      const dt = lastT ? Math.min(3, (t - lastT) / 16.6667) : 1
      lastT = t
      const k = 1 - Math.pow(1 - EASE, dt)
      current += (target - current) * k
      if (Math.abs(target - current) < 0.4) {
        current = target
        el.scrollLeft = current
        running = false
        lastT = 0
        return
      }
      el.scrollLeft = current
      raf = requestAnimationFrame(frame)
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      // Let a scrollable element under the cursor (an open card, the changelog)
      // take the scroll instead of moving the timeline sideways.
      let node = e.target as HTMLElement | null
      while (node && node !== el) {
        if (node.scrollHeight > node.clientHeight + 1) {
          const oy = getComputedStyle(node).overflowY
          if (oy === 'auto' || oy === 'scroll') {
            const down =
              e.deltaY > 0 &&
              node.scrollTop + node.clientHeight < node.scrollHeight - 1
            const up = e.deltaY < 0 && node.scrollTop > 0
            if (down || up) return
          }
        }
        node = node.parentElement
      }
      e.preventDefault()
      if (reduce) {
        el.scrollLeft += e.deltaY
        return
      }
      if (!running) {
        current = el.scrollLeft
        target = current
      }
      target = Math.max(0, Math.min(maxLeft(), target + e.deltaY * SPEED))
      if (!running) {
        running = true
        lastT = 0
        raf = requestAnimationFrame(frame)
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main
      ref={scrollRef}
      className={cn(
        'flex h-full overflow-x-auto overflow-y-hidden',
        cleanScroll,
        '[&::-webkit-scrollbar]:h-2',
      )}
    >
      <IntroPanel />
      <Stage label="Finished" caption="Done" items={finishedItems} />
      <Stage label="In Progress" caption="Building now" items={inProgressItems} accent />
      <Stage label="Next" caption="Coming up" items={nextItems} />
      <Stage label="Planned" caption="Future" items={plannedItems} />
      <section className="flex h-full w-screen shrink-0 flex-col items-center justify-center px-8 text-center md:px-10">
        <ContactContent onOpenChangelog={onOpenChangelog} />
      </section>
    </main>
  )
}

function MobileCard({ item }: { item: Item }) {
  const openCard = useContext(CardModalContext)
  const [open, setOpen] = useState(false)
  const n = item.children?.length ?? 0

  if (n > 0) {
    return (
      <button
        type="button"
        onClick={() => openCard(item)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-4 text-left transition-colors hover:bg-foreground/[0.03]"
      >
        <span className="flex items-center gap-2 text-[15px] font-medium leading-snug tracking-[-0.01em]">
          {item.title}
          <CountBadge n={n} />
        </span>
        <OpenIcon />
      </button>
    )
  }

  return (
    <div
      className={cn(
        'rounded-xl border bg-card transition-colors',
        open ? 'border-primary/40' : 'border-border',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
      >
        <span className="text-[15px] font-medium leading-snug tracking-[-0.01em]">
          {item.title}
        </span>
        <Chevron open={open} />
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 pb-4 pt-1">
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileStage({ label, caption, items, accent }: StageProps) {
  return (
    <section className="border-t border-border px-6 py-10">
      <h2
        className={cn(
          'text-[28px] font-bold tracking-[-0.02em]',
          accent && 'text-primary',
        )}
      >
        {label}
      </h2>
      <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {caption}
      </p>
      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <MobileCard key={it.title} item={it} />
        ))}
      </div>
    </section>
  )
}

function MobileRoadmap({ onOpenChangelog }: { onOpenChangelog: () => void }) {
  return (
    <div
      className={cn(
        'h-svh overflow-y-auto overflow-x-hidden',
        cleanScroll,
        '[&::-webkit-scrollbar]:w-1.5',
      )}
    >
      <header className="px-6 pb-10 pt-16">
        <TitleBlock />
      </header>
      <MobileStage label="Finished" caption="Done" items={finishedItems} />
      <MobileStage label="In Progress" caption="Building now" items={inProgressItems} accent />
      <MobileStage label="Next" caption="Coming up" items={nextItems} />
      <MobileStage label="Planned" caption="Future" items={plannedItems} />
      <section className="flex flex-col items-center border-t border-border px-6 py-16 text-center">
        <ContactContent onOpenChangelog={onOpenChangelog} />
      </section>
    </div>
  )
}

function ChangelogOverlay({
  open,
  onClose,
  entries,
}: {
  open: boolean
  onClose: () => void
  entries: ChangeEntry[]
}) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close changelog"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 top-[6%] mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] border border-border bg-background transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5 md:px-8">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-primary">
              Changelog
            </p>
            <h2 className="mt-1 text-[20px] font-bold tracking-[-0.02em] md:text-[22px]">
              Everything built so far
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className={cn(
            'flex-1 overflow-y-auto px-6 py-2 md:px-8',
            cleanScroll,
            '[&::-webkit-scrollbar]:w-2',
          )}
        >
          {[...entries].reverse().map((e, i) => (
            <div
              key={i}
              className="grid grid-cols-[78px_1fr] gap-x-4 border-b border-border py-4 last:border-b-0"
            >
              <span className="pt-0.5 font-mono text-[12px] uppercase tracking-wide text-muted-foreground">
                {e.date}
              </span>
              <div>
                <p className="text-[15px] font-medium tracking-[-0.01em]">
                  {e.title}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [logOpen, setLogOpen] = useState(false)
  const [card, setCard] = useState<Item | null>(null)
  const [cardOpen, setCardOpen] = useState(false)
  const isMobile = useIsMobile()
  const openCard = (it: Item) => {
    setCard(it)
    setCardOpen(true)
  }

  return (
    <div className="h-svh overflow-hidden bg-background text-foreground">
      <CardModalContext.Provider value={openCard}>
        {isMobile ? (
          <MobileRoadmap onOpenChangelog={() => setLogOpen(true)} />
        ) : (
          <DesktopRoadmap onOpenChangelog={() => setLogOpen(true)} />
        )}
      </CardModalContext.Provider>
      <CardModal
        item={card}
        open={cardOpen}
        onClose={() => setCardOpen(false)}
      />
      <ChangelogOverlay
        open={logOpen}
        onClose={() => setLogOpen(false)}
        entries={changelogItems}
      />
    </div>
  )
}
