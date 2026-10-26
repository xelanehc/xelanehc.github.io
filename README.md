# xelanehc.github.io

Personal site of Alex Chen: projects, experience, and contact. Live at **https://xelanehc.github.io**.

Built with Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and Motion. Deployed to GitHub Pages by GitHub Actions.

## Getting started

Requires Node 22 (see `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Script            | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                     |
| `npm run build`   | Static export to `out/`                        |
| `npm run preview` | Serve `out/` locally (run `build` first)       |
| `npm run check`   | Lint + typecheck + format check (what CI runs) |
| `npm run format`  | Format everything with Prettier                |

## Project structure

```
src/
├── app/                    # Routes (App Router)
│   ├── page.tsx            # Home
│   ├── projects/           # /projects and /projects/[slug] (MDX case studies)
│   ├── experience/         # /experience
│   ├── contact/            # /contact
│   ├── og/[image]/         # Open Graph images → /og/<name>.png (built at export)
│   ├── template.tsx        # Route transitions (React <ViewTransition>)
│   ├── sitemap.ts, robots.ts, icon.svg, favicon.ico, apple-touch-icon.png/
│   └── globals.css         # Design tokens (light/dark), utilities, transitions
├── components/
│   ├── ui/                 # shadcn / registry components (generated; don't hand-edit)
│   ├── layout/             # Header, nav, ⌘K command menu, footer, providers
│   ├── sections/           # Page sections (home/, experience/, cards, headings)
│   ├── graph/              # Hero graph: content → nodes/edges, canvas renderer
│   ├── motion/             # Reveal, SpotlightCard, Motion features
│   └── icons/
├── content/                # All site content (typed data + MDX)
├── lib/                    # content getters, site config + metadata, OG renderer
├── types/content.ts        # Content model
└── mdx-components.tsx      # MDX typography
```

**Rule of thumb:** pages compose sections, sections read content through `src/lib/content.ts`, and `components/ui` never imports content.

## Editing content

Everything visitors read lives in `src/content/`. The types in `src/types/content.ts` document every field.

- **Experience:** add an entry to `experience.ts`. `kind` is `work`, `research`, or `activity`; dates are `"YYYY-MM"` (omit `end` for ongoing roles). Wrap phrases in `**double asterisks**` to emphasize metrics. `areas` drive the hero graph and the Experience filter.
- **Projects:** add an entry to `projects.ts`. For a case study, create `src/content/projects/<slug>.mdx` and set `hasCaseStudy: true`. The project page, OG image, sitemap entry, ⌘K item, and graph node are all generated automatically.
- **Profile, highlights, publications, education, skills:** the matching files in `src/content/`.
- **Navigation:** `navItems` in `src/lib/site.ts` (shared by navbar, footer, ⌘K, and sitemap).

## Adding UI components

shadcn is configured with the SmoothUI and Magic UI registries (`components.json`):

```bash
npx shadcn@latest add dialog              # shadcn/ui
npx shadcn@latest add @magicui/marquee     # Magic UI
npx shadcn@latest add @smoothui/siri-orb   # SmoothUI
```

Generated files land in `src/components/ui/`, which is excluded from Prettier so they stay identical to upstream. Customize by wrapping, not editing.

## Conventions worth knowing

- **Motion:** the app uses `LazyMotion` in strict mode, so use `m.*` from `motion/react-m`, not `motion.*` (which throws). Prefer CSS for simple effects.
- **Scroll reveals:** wrap content in `<Reveal>`. It is server-rendered and never hides content that is on screen at load.
- **Heavy client UI loads lazily** (graph canvas, ⌘K palette, mobile menu, toaster) via `next/dynamic` to keep mobile Lighthouse ≥ 95.
- **Metadata:** use `pageMetadata()` from `src/lib/site.ts` for title, description, canonical URL, and OG tags.
- **Colors:** use the tokens (`bg-card`, `text-muted-foreground`, `text-brand`, …). Everything adapts to light and dark mode.
- **Static export:** no server features (no request-time APIs, no image optimization). Image routes need `dynamic = "force-static"` and a real file extension, because GitHub Pages sets `Content-Type` from it.

## Deployment

- **Pull requests:** `.github/workflows/ci.yml` runs lint, typecheck, format check, and build.
- **Push to `main`:** `.github/workflows/deploy.yml` runs the same checks, builds `out/`, and deploys to GitHub Pages (repo setting: Pages → Source → GitHub Actions).
- **Dependabot** opens weekly grouped update PRs. ESLint and TypeScript majors are held back until `eslint-config-next`'s plugins support them.

Personal documents (such as a resume PDF) are git-ignored and must never be committed.
