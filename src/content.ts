/**
 * Roadmap content for heyaurelia, mined and curated from the Aurelia commit
 * history and the sticky board. Plain, human voice. No em dashes, no jargon.
 */

export interface Item {
  title: string
  description: string
  children?: Item[]
}

export interface ChangeEntry {
  date: string
  title: string
  description: string
}

export const finishedItems: Item[] = [
  { title: "Chat assistant that knows your work", description: "A polished chat where you talk to one smart assistant that reads your inbox, drafts replies, and bases its answers on your real business data.", children: [
    { title: "Conversational assistant", description: "Sign in, connect Google, and chat with an assistant that reads your inbox and drafts replies for you." },
    { title: "One assistant, not a crowd of bots", description: "A single smart assistant that quietly uses tools and delegates behind the scenes, instead of a tangle of specialist bots." },
    { title: "Inbox triage you can act on", description: "A sortable view of your inbox where clicking a message opens the reply drafted for it." },
    { title: "See and manage your real inbox", description: "Your emails render in full with their real formatting, and you can delete, archive, move, or mark spam right there. Aurelia can take those same actions now too, but only by asking you first, and she still only ever reads the plain text of an email." },
    { title: "Your business data on hand", description: "Simple contacts, a product catalog, and a deals pipeline, so answers come from your real information." },
    { title: "Daily Brief", description: "Ask for your rundown and get a short here-is-your-day summary pulled from your inbox and activity." },
  ] },
  { title: "A chat that feels alive", description: "Replies stream in word by word, you can see the assistant think, and you can talk to it however you like.", children: [
    { title: "Live token streaming and Stop", description: "Replies appear as they are written, and you can hit Stop mid-run to end early." },
    { title: "See it think", description: "Its real reasoning streams into a block you can open and read, and you can see how long it spent thinking." },
    { title: "Voice and images", description: "Speak your request and hear natural spoken replies, or attach photos the assistant can actually see and zoom into." },
    { title: "Saved chats and details", description: "Conversations are saved with auto-generated titles, plus copy, retry, search, and transcript export." },
    { title: "Instant sync across devices", description: "Open the same conversation on another device and watch it update live with no refresh." },
  ] },
  { title: "Permissions and safety", description: "Aurelia asks before it acts by default, and you decide how much freedom to give it, all the way up to acting on its own.", children: [
    { title: "You set the permissions", description: "A full ask, allow, or run-everything ladder you control per tool, with a visible record of what it is allowed to do." },
    { title: "Approve before it acts", description: "By default, any action with a real effect pops an approval card in the chat, and after you decide it confirms what actually happened." },
    { title: "Run-everything mode", description: "Give it full freedom and it acts on its own, with only Deny or the kill switch to stop it." },
    { title: "Honest about its work", description: "Plain summaries of what each step did, and it will not invent an outcome it did not actually produce." },
  ] },
  { title: "Memory that sticks", description: "Tell it to remember something and it keeps the fact, recalls it in later chats, and captures important details on its own." },
  { title: "Queue and steer mid-task", description: "Type follow-ups while it is working and they queue, sync across your devices, and fold into the task in flight, or you can interrupt outright." },
  { title: "Bring your own model", description: "Pick Haiku, Sonnet, or Opus per conversation, or point Aurelia at an OpenAI-compatible or local model from a smart picker." },
  { title: "Crunch your data and connect tools", description: "Attach a spreadsheet and get answers from real computed tables, run code in a safe sandbox, and connect outside tools through a safety gate." },
  { title: "Make it yours", description: "A short first-run interview personalizes the assistant by name, you can build your own assistant from a description, and you can ground it in knowledge files you attach." },
]

export const inProgressItems: Item[] = [
  { title: "A video clipper, finishing it first", description: "The thing we are building right now. Hand it one long video and get back short, ready-to-post clips. The big piece just landed: it actually cuts the clips now, upright and captioned, and the whole thing runs on your own computer. Next we are building the screen where you pick a video and tell it what you want, and wrapping it all in an app you install so there is nothing to set up by hand." },
  { title: "Content and images", description: "Tools for making content, with the image side still finding its footing.", children: [
    { title: "Studio content tools", description: "Generate captions, hashtags, and branded cover cards for your posts." },
    { title: "Image generation", description: "Image creation that can use different providers, with a no-cost demo mode and a smooth loading animation, while the real thing waits on the right provider." },
  ] },
  { title: "Coding-agent mode", description: "Early groundwork to use Aurelia as a coding helper, read-only for now and on your own machine first, with a safer change-request mode planned later." },
]

export const nextItems: Item[] = [
  { title: "Let her act on her own, and only check in on the big stuff", description: "We have decided to flip how she works. Instead of asking you about almost everything, she will handle the everyday things herself and only stop to check with you on the big, risky ones. This is a decision we have made, not something that is built yet." },
  { title: "Safety nets for acting on its own", description: "An undo and take-back layer plus a careful send gate with rate limits and a dry-run mode, so giving her more freedom stays safe." },
  { title: "Reach her beyond email", description: "Talk to Aurelia where you already are, on chat apps and more, not just in email. The first chat-app connection comes first, then we widen out from there." },
  { title: "Routines that run on a schedule", description: "Named jobs that run on their own at the times you pick, each with its own tools and its own level of freedom, plus a morning digest of your inbox and activity." },
  { title: "Cleaner workspace", description: "A reworked sidebar with quick search and grouped recents, and a refresh of the weaker pages based on real usability research." },
]

export const plannedItems: Item[] = [
  { title: "Web research, and skills you can add", description: "Let Aurelia dig into a question on the web and back up her answers with the sources she used, plus a growing library of skills you can switch on, with the ability to spin up new helpers when you need them." },
  { title: "Deeper memory of your past conversations", description: "Push memory past single facts toward real continuity, so she remembers the conversations you have had together, not just the facts you told her to keep." },
  { title: "Aurelia on your phone", description: "A native iPhone app that shares the same foundation as the web app." },
  { title: "Agent profiles, one core with many faces", description: "Give the assistant distinct faces, each with its own personality, knowledge, tools, and level of trust, so a public-facing face and your private one stay separate." },
  { title: "Run it on your own hardware", description: "Install and self-host Aurelia on your own Mac, with one-click setup and updates so it stays private and local-first." },
  { title: "More work tools", description: "Read-only finance reporting with no money movement, social reply drafting and a post calendar, and connections to stores so it understands your inventory and orders." },
  { title: "Built for trust and scale", description: "Billing and spending caps, security and compliance hardening, monitoring and reliability, and data sharing that stays off by default and you can take back any time." },
  { title: "A creative suite inside the app", description: "Built-in creative tools for making content right where you work." },
]

export const changelogItems: ChangeEntry[] = [
  { date: "Jun 5", title: "First working build", description: "Sign in, connect Gmail, and chat with an assistant that reads your inbox and drafts replies." },
  { date: "Jun 5", title: "Connect your Google account", description: "A secure sign-in flow and an encrypted vault for linking your real email." },
  { date: "Jun 6", title: "Claude-style chat", description: "Saved conversations, a live working indicator, copy and retry, and a personalized greeting." },
  { date: "Jun 6", title: "Inbox triage you can act on", description: "An interactive view where clicking a message opens the reply drafted for it." },
  { date: "Jun 6", title: "Instant sync across devices", description: "Open a conversation on another device and watch it update live with no refresh." },
  { date: "Jun 7", title: "Talk to it out loud", description: "Hands-free voice mode with natural spoken replies you can choose from." },
  { date: "Jun 7", title: "Attach and discuss images", description: "Add photos in chat that the assistant can actually see and you can zoom into." },
  { date: "Jun 8", title: "It remembers what matters", description: "Tell it to remember something and it recalls the fact in later chats." },
  { date: "Jun 7", title: "Build your own assistant", description: "Describe an assistant in plain words and get a configured one you can name and edit." },
  { date: "Jun 8", title: "Business data on hand", description: "Contacts, a product catalog, and a deals pipeline to ground answers in real information." },
  { date: "Jun 9", title: "The one-assistant redesign", description: "Collapsed a tangle of bots into a single smart assistant that uses tools behind the scenes." },
  { date: "Jun 9", title: "Approve before it acts", description: "Actions with a real effect pop an approval card in the chat so nothing happens without your okay." },
  { date: "Jun 9", title: "Stop button and live streaming", description: "Replies stream in word by word and you can hit Stop mid-run." },
  { date: "Jun 10", title: "Pick your model", description: "Choose Haiku, Sonnet, or Opus per conversation, search past chats, and export a transcript." },
  { date: "Jun 11", title: "Mission Control workspace", description: "A windowed space to arrange live task and inbox windows and approve work in place." },
  { date: "Jun 11", title: "Crunch your numbers", description: "Upload a spreadsheet and get answers from real computed tables in a safe code sandbox." },
  { date: "Jun 11", title: "Connect outside tools", description: "Connect outside tools through a safety gate, with an allow-list for each account." },
  { date: "Jun 12", title: "Friendly onboarding", description: "A short, skippable first-login interview that personalizes the assistant to you by name." },
  { date: "Jun 11", title: "Knowledge files", description: "Attach a document, approve it, and the assistant grounds its answers in it." },
  { date: "Jun 13", title: "See it think", description: "Watch its real reasoning stream in live, with a clear note of how long it spent thinking." },
  { date: "Jun 19", title: "Renamed to Aurelia", description: "The product was rebranded from Monarch to Aurelia with a new star mark." },
  { date: "Jun 20", title: "You set the permissions", description: "A full ask, allow, or run-everything ladder you control, with a visible trust record." },
  { date: "Jun 21", title: "Queue and steer mid-task", description: "Type follow-ups while it works and they queue, sync across devices, and fold into the task." },
  { date: "Jun 22", title: "Bring your own model", description: "Point Aurelia at OpenAI-compatible or local models, not just Claude." },
  { date: "Jun 23", title: "Studio content tools", description: "Generate captions, hashtags, and cover cards, with a scheduler that queues posts for approval." },
  { date: "Jun 21", title: "Ask better questions", description: "When a request is unclear, it asks multiple-choice questions instead of guessing." },
  { date: "Jun 23", title: "No-spend demo image mode", description: "Approval forwards generated images into the chat, plus a demo image mode that costs nothing." },
  { date: "Jun 24", title: "Live thinking streams in", description: "The model's real reasoning streams into a clickable thinking block and stays with each turn." },
  { date: "Jun 24", title: "Long replies no longer cut off", description: "Fixed timeouts and a hard length cap that were chopping long replies short." },
  { date: "Jun 24", title: "Interrupt it mid-task", description: "A press-to-interrupt control that stops the assistant mid-run so you can redirect it on the spot." },
  { date: "Jun 24", title: "Smarter tool picking", description: "The assistant searches its full toolset by what you need, so it reaches for the right tool without slowing down." },
  { date: "Jun 25", title: "Real Gmail, live", description: "The real Gmail connection is on: it reads and triages your actual inbox and drafts replies you approve." },
  { date: "Jun 25", title: "See and manage your real emails", description: "Emails render with their real formatting, and you can delete, archive, or mark spam right in the workspace." },
  { date: "Jun 26", title: "A cleaner, faster inbox", description: "The inbox got a full rebuild: sender avatars and tidy rows, emails that open at full size with their images, a delete that slides out as you reach for it, a Select mode for clearing in bulk, and a layout that reflows to a single column on a small window." },
  { date: "Jun 26", title: "Aurelia can act on your inbox now", description: "With your okay on each step, Aurelia can archive, mark spam, move things between folders, and mark read, not just draft replies. The inbox also gained Gmail-style category filters that she pays attention to, so she skips marketing unless you ask, a reply and forward box you can write in, a way to move things out of Junk, and a small command box to tell her what to do when no email is open." },
  { date: "Jun 26", title: "An inbox that keeps itself fresh", description: "The list quietly refreshes on its own, so new mail and the results of any action show up without you hitting reload." },
  { date: "Jun 26", title: "First piece of the video clipper", description: "The groundwork for turning one long video into a set of suggested clips you can review. It proposes the clips for now and does not render the finished files yet." },
  { date: "Jun 26", title: "She knows herself and the app", description: "Aurelia now describes herself and the app accurately. She stopped calling herself just a chat box, and she stopped pointing you to pages and buttons that are not actually there." },
  { date: "Jun 26", title: "Measured against the best", description: "A big research pass comparing Aurelia to the leading do-it-on-its-own assistant, to see where she stands and what to build next." },
  { date: "Jun 28", title: "The clipper makes real clips now", description: "It went from only suggesting where the clips should be to actually cutting them: hand it a long video and get back short, upright clips with the captions burned in, ready to post. It all runs on your own computer, nothing in the cloud." },
]
