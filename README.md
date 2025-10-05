Personal website and CS portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Project Structure

- `src/app` — App Router pages and layout
- `src/components` — Reusable UI components
- `src/data` — Portfolio data (projects, experience)
- `public` — Static assets

## Customize

- Update site metadata in `src/app/layout.tsx`.
- Edit homepage content in `src/app/page.tsx`.
- Add or modify projects in `src/data/projects.ts`.
- Add or modify experience in `src/data/experience.ts`.
- Update contact info in `src/app/contact/page.tsx`.

## Build

```bash
npm run build
npm start
```

## Deploy

Deploy easily to Vercel. Other platforms work too; this is a standard Next.js app.
