import { StarMark } from '@/components/star-mark'
import { Section } from '@/components/section'
import { Changelog, StateBadge } from '@/components/changelog'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  LEAD,
  STATUS_PARAGRAPH,
  UPDATED_LABEL,
  recentlyShipped,
  nowItems,
  nextItems,
  laterItems,
  olderUpdates,
} from '@/content'

const cardClass =
  'rounded-lg border border-border bg-card shadow-none ring-0 transition-colors hover:border-foreground/20'

function Header() {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="dot-matrix pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto w-full max-w-3xl px-6 py-24 md:py-32">
        <p className="mb-6 font-mono text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
          {UPDATED_LABEL}
        </p>
        <h1 className="flex items-center gap-3 text-[44px] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[56px]">
          Aurelia
          <StarMark size={28} className="mt-1 md:mt-2" />
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {LEAD}
        </p>
      </div>
    </header>
  )
}

function StatusNow() {
  return (
    <Section title="Where we are now">
      <Card className={cardClass}>
        <CardContent>
          <p className="text-base leading-relaxed text-muted-foreground">
            {STATUS_PARAGRAPH}
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            <span
              className="size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span className="font-mono text-[13px] font-medium tracking-wide text-foreground">
              Active development
            </span>
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}

function RecentlyShipped() {
  return (
    <Section
      title="Recently shipped"
      lead="The most recent changes, newest first."
    >
      <Changelog entries={recentlyShipped} />
    </Section>
  )
}

function InProgress() {
  return (
    <Section
      eyebrow="Now"
      title="In progress"
      lead="What we are building right now."
    >
      <ul className="space-y-px">
        {nowItems.map((item) => (
          <li
            key={item.title}
            className="grid gap-x-4 gap-y-1 border-t border-border py-5 last:border-b md:grid-cols-[1fr_auto] md:items-baseline"
          >
            <div>
              <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
            {item.inProgress ? (
              <div className="md:pt-0.5">
                <StateBadge>In progress</StateBadge>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function WhatsNext() {
  return (
    <Section eyebrow="Next & Later" title="What's next" width="wide">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-1 font-mono text-[13px] font-medium tracking-wide text-foreground uppercase">
            Next
          </p>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Coming up next. No dates yet.
          </p>
          <ul className="space-y-5">
            {nextItems.map((item) => (
              <li key={item.title} className="border-t border-border pt-5">
                <h3 className="text-base font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 font-mono text-[13px] font-medium tracking-wide text-foreground uppercase">
            Later
          </p>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Further out. This is the big direction, and it could change.
          </p>
          <ul className="space-y-5">
            {laterItems.map((item) => (
              <li key={item.title} className="border-t border-border pt-5">
                <h3 className="text-base font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function HowItWorks() {
  return (
    <Section title="How it works, and what to expect">
      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          Every action that reaches outside the chat follows a rule you set.
          The assistant suggests, and your settings decide. It can ask for more
          room when it needs it, but it can never give itself more. Anything
          risky always checks with you first.
        </p>
        <p>
          We try to be straight with you. Anything still rough around the edges
          is marked{' '}
          <span className="font-mono text-[13px] text-foreground">beta</span>.
          Everything under Next and Later is where we are headed, not a promise
          with a date on it. And if something ever goes wrong, there is a stop
          button, a full record of what happened, and a way to undo.
        </p>
      </div>
    </Section>
  )
}

function MoreUpdates() {
  return (
    <Section title="More updates">
      <Accordion>
        <AccordionItem value="older">
          <AccordionTrigger>Earlier changes</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4 pt-2">
              {olderUpdates.map((u, i) => (
                <li
                  key={i}
                  className="grid gap-1 md:grid-cols-[120px_1fr] md:gap-4"
                >
                  <span className="font-mono text-[13px] font-medium text-muted-foreground">
                    {u.date}
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted-foreground">
                    {u.text}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-12">
        <span className="text-sm font-medium">Aurelia</span>
        <span className="font-mono text-[13px] text-muted-foreground">
          Last updated June 2026
        </span>
        <a
          href="#"
          className="ml-auto text-sm font-medium text-primary underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
        >
          Get in touch
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main>
        <StatusNow />
        <RecentlyShipped />
        <InProgress />
        <WhatsNext />
        <HowItWorks />
        <MoreUpdates />
      </main>
      <Footer />
    </div>
  )
}
