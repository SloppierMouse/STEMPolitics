
# STEMpolitics.com

Next.js 14 App Router + Tailwind CSS + TypeScript. Hosted on Hostinger (Node.js server — output: 'standalone' in next.config.ts).

## Rules
- Check existing files before writing anything. Ask if repo state is unclear.
- Server components by default; client components only when interactivity is required.
- All secrets via environment variables — never hardcoded.
- No `any` types. No inline styles — Tailwind only.
- Owner knows Python not JS: explain non-obvious concepts briefly when relevant.

## Key Files
- /data/politicians.json — politician data
- /data/essays/*.md — Why It Matters essays
- /public/politicians/ — headshot images
- /app/api/summarize/route.ts — Claude API summary route

## /api/summarize Behavior
POST { title, description } → 2-sentence claude-haiku-3-5 summary. Cache by URL. Fall back to RSS description on failure.

## RSS Filter Keywords
policy, regulation, congress, legislation, government, senate, STEM, science funding, NASA, climate, AI regulation, tech
  
