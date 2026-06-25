/**
 * The page's content, kept apart from layout so the copy is easy to revise.
 * Voice: plain and human. No jargon, no em dashes. Say it the way you would to
 * a friend who is not technical. "Now" is what we are building; "Next" and
 * "Later" are where we are headed, with no dates.
 */

export interface ChangelogSubItem {
  label: 'New' | 'Improved' | 'Fixed'
  text: string
}

export interface ChangelogEntry {
  date: string
  title: string
  description: string
  items?: ChangelogSubItem[]
  beta?: boolean
}

export const UPDATED_LABEL = 'Updated June 2026'

export const LEAD = `One assistant that helps with your whole workday. You talk to it like a person, it actually does the work for you, and it never does anything you did not say it could.`

export const STATUS_PARAGRAPH = `Aurelia is one assistant you chat with, and it can really get things done using your tools. Nothing it does happens until you allow it. The heart of it is finished and we use it every day: the chat, a window into what it is thinking, and the controls that decide what it is allowed to do. What we are working on now is giving it more to do, and making it better at the things it already does.`

export const recentlyShipped: ChangelogEntry[] = [
  {
    date: 'June 2026',
    title: 'The chat, and watching it work',
    description: `The conversation is the whole thing now, and you can watch the assistant work while it works.`,
    items: [
      { label: 'New', text: `You can open up its thinking and watch it reason in real time, and that stays saved with the chat.` },
      { label: 'New', text: `After you approve or turn down something it wants to do, it tells you what actually happened and what comes next.` },
      { label: 'Improved', text: `The chat only scrolls along when you are reading the latest. When you scroll up to read, it leaves you there and gives you a small button to jump back down.` },
      { label: 'Improved', text: `When a request is vague, it asks you a quick question instead of guessing.` },
    ],
  },
  {
    date: 'June 2026',
    title: 'You decide what it is allowed to do',
    description: `You set what the assistant can and cannot do, one thing at a time, and it can never give itself more freedom than you gave it.`,
    items: [
      { label: 'New', text: `For everything it can do, you pick one of three: never, ask me first, or go ahead. It suggests, and your choice decides.` },
      { label: 'New', text: `A button that stops everything at once, a full record of every action it took, and limits so it cannot run away with anything.` },
      { label: 'Improved', text: `Anything risky always asks first. It leans toward checking with you, never toward just doing it.` },
    ],
  },
  {
    date: 'June 2026',
    title: 'It remembers, reads your inbox, and connects to your tools',
    description: `It holds on to what matters and can work with a real inbox, all behind the same controls.`,
    items: [
      { label: 'New', text: `It remembers the things that matter about you and your work, and brings them up when they are useful.` },
      { label: 'New', text: `It can sort your inbox and write replies, but it never sends them. And you can plug in outside tools, each one checked before it runs.` },
      { label: 'New', text: `A safe little space where it can run code without touching anything it should not.` },
    ],
    beta: true,
  },
  {
    date: 'June 2026',
    title: 'Staying in control, and longer answers',
    description: `You can steer a task while it runs, and answers no longer get cut off.`,
    items: [
      { label: 'New', text: `Line up a follow up while it is working, nudge it in a new direction, or stop it.` },
      { label: 'Fixed', text: `Long answers no longer get cut short or freeze partway through. The old length limit and the timeout that caused it are gone.` },
    ],
  },
]

export interface NowItem {
  title: string
  description: string
  inProgress?: boolean
}

export const nowItems: NowItem[] = [
  { title: `Run it on your own computer`, description: `So you have Aurelia on your own machine, working with whatever AI you want, and you stay in control of what it costs.`, inProgress: true },
  { title: `Help with code and files`, description: `It can read your code and files now. Soon it will be able to make changes too, always checking with you first.`, inProgress: true },
  { title: `Make and edit images`, description: `Create and tweak images right inside the chat.`, inProgress: true },
  { title: `Connect a real email inbox`, description: `Hook up your actual Gmail so it can sort and draft for you. It still never sends without you.`, inProgress: true },
  { title: `Write your social posts`, description: `Captions, hashtags, and cover images for the things you post.`, inProgress: true },
  { title: `Remember more of your story`, description: `Moving past single facts toward remembering the whole thread of your conversations, with a place to see and tidy what it knows.`, inProgress: true },
]

export interface RoadmapItem {
  title: string
  description: string
}

export const nextItems: RoadmapItem[] = [
  { title: `One inbox for everything`, description: `Your email, your DMs, and your comments all in one place to deal with.` },
  { title: `Do things on a schedule`, description: `Like a morning summary, or following up at the right time without you asking.` },
  { title: `A daily catch up`, description: `A short rundown each day of what actually needs you.` },
  { title: `Plan and draft your content`, description: `A calendar for your posts, and it drafts the posts and replies for you.` },
  { title: `Help with the money side`, description: `Read and sort your finances and pull together simple reports. It never moves any money.` },
  { title: `A one click installer`, description: `An easy setup so you can put Aurelia on your own computer with no technical fuss.` },
  { title: `Simple monthly billing`, description: `Pay monthly, see exactly what you are using, no surprises.` },
  { title: `Reach it on Discord`, description: `Message it on Discord to start, with more places to talk to it after that.` },
]

export const laterItems: RoadmapItem[] = [
  { title: `Every place people message you`, description: `Texts, WhatsApp, and the rest, all handled in one place. Plus an app for your phone.` },
  { title: `It runs your day`, description: `Quietly taking care of the routine work on its own, always inside the rules you set.` },
  { title: `Real research, done for you`, description: `Ask it to look into something online and bring back what matters, with the sources it used.` },
  { title: `Photo and video editing`, description: `Editing your images and video, cutting long videos into short clips, and turning audio into text.` },
  { title: `Bring your own AI`, description: `Connect your own AI account, or run one right on your computer, whatever you prefer.` },
  { title: `Smart pricing help`, description: `Real guidance on what to charge for the things you sell.` },
  { title: `Build your own helpers`, description: `Create and train your own assistants for specific jobs, with no code needed.` },
]

export const olderUpdates: { date: string; text: string }[] = [
  { date: 'June 2026', text: `Your permission choices now follow you from one device to another.` },
  { date: 'June 2026', text: `Conversations get a title and a short summary on their own, so your history is easy to skim.` },
  { date: 'June 2026', text: `A cleaner sidebar and message box, so the conversation gets the attention.` },
  { date: 'June 2026', text: `Your settings stick around after a restart and stay private to you.` },
  { date: 'June 2026', text: `It only tells you things it can back up with your real data, and says so honestly when it cannot.` },
  { date: 'Earlier', text: `Talk to it out loud, and send it images.` },
  { date: 'Earlier', text: `Build your own assistants from ready made templates.` },
  { date: 'Earlier', text: `It double checks its own answers before it shows them to you.` },
  { date: 'Earlier', text: `The project was renamed from Monarch to Aurelia.` },
]
