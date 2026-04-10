# Elevate Studio — Claude Code Context

## Project
Next.js site for Elevate Studio (elevatestudio.xyz). One-file architecture.
- `app/page.tsx` — all sections + inline editor
- `app/layout.tsx` — all CSS (no Tailwind — Turbopack bug)
- Deployed: Vercel (`studio-web-roan.vercel.app`), repo: `github.com/bilguun-elevate/studio-web`
- Dev server: `npx next dev` on port 3000

## Design Rules
- 80/20 white/gradient. Lime accent `#b8f542`. Light mode only.
- 80px side padding. No Tailwind.
- Ref aesthetic: newgenre.studio — editorial restraint, friendly-premium minimalism.

## Architecture
- `ET` component — editable text. `id` = localStorage key, second arg = source fallback.
- `EI` component — editable image. Same pattern.
- `?edit=true` → inline editor mode. "Copy Changes" exports JSON. Bake JSON into source fallbacks when done.
- `SectionLabel` — small caps label, wraps `ET` when `id` prop passed.

## Current State (as of commit ab7c451)
### Done
- Full site: Hero, Statement, TrustedBy, Projects, Services, Principles, Team, Pricing, FAQ, Contact, Footer
- Nav: grid-dots toggle, clip-path overlay, click-outside-to-close
- Menu hover: fixed — blur removed, opacity dims non-hovered to 0.35, hovered stays 1
- All content baked in: Mongolian copy, correct project descs/categories/CTAs, principles updated

### TODO
1. Upload logos → `public/logos/` → wire into TrustedBy grid (18 slots, currently placeholder lines)
2. Team photos → `public/team/` → replace picsum seeds in `team` array `EI` src
3. Project images → `public/projects/` → replace picsum seeds in `projects` array `EI` src
4. Domain switch to elevatestudio.xyz (Vercel settings)
5. Case study pages

## Communication
- Caveman talk. No filler. Max concision.
- Read file before editing.
- No unnecessary changes beyond what's asked.
