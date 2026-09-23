# heyaurelia.com

The public site for Aurelia: one page that says what Aurelia is and how to get it.

Live at **[heyaurelia.com](https://heyaurelia.com)**.

## How it is made

The page is built in the Aurelia-Landing project, which also holds its design notes (`docs/landing-brief.md`).
`npm run build:site` there writes the finished site to `dist/site`. This repository only holds that output, in
`site/`. Pushing to `main` uploads `site/` to GitHub Pages as it is.

To change the site, change it in Aurelia-Landing, build it, replace `site/` here with `dist/site`, commit and push.

The status and roadmap page that lived here until 23 September 2026 is in the history, at commit `6487151`.

## License

Proprietary. All rights reserved. See [LICENSE](./LICENSE). No permission is granted to use, copy, or modify
this software.
