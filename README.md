# Aurelia Roadmap

The public status and roadmap page for Aurelia, an AI agent that grows with you.

Live at **[heyaurelia.com](https://heyaurelia.com)**.

## What this is

A single page that shows what Aurelia can do today, what is being built, and
where it is going. On desktop it reads as a sideways timeline you scroll
through; on mobile it stacks into a vertical one. A full changelog of everything
shipped lives at the end.

## Stack

- Vite, React 19, TypeScript
- Tailwind CSS v4
- Deployed to GitHub Pages

## Develop

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # production build to dist/
pnpm preview    # preview the production build
```

Roadmap copy lives in `src/content.ts`. Pushing to `main` builds and deploys to
GitHub Pages automatically.

## License

Proprietary. All rights reserved. See [LICENSE](./LICENSE). No permission is
granted to use, copy, or modify this software.
