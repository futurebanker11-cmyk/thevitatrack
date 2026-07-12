# thevitatrack.com on Cloudflare — deploy guide (2026-07-12)

Migrating off Vercel (deployment paused) to Cloudflare Workers, same setup as
studyvirus.com. Stack: Next.js 16.2.10 + `@opennextjs/cloudflare@^1.20.1`.

Note: Next was bumped 16.2.3 → 16.2.10 because the adapter's peer range excludes
16.0–16.2.5 (requires `>=15.5.18 <16 || >=16.2.6`). Patch bump, same 16.2 line.

## What was added to the repo
- `wrangler.jsonc` — Worker config (nodejs_compat, static assets from `.open-next/assets`)
- `open-next.config.ts` — adapter config (default; no R2 — see ISR note below)
- `package.json` — `cf:build` / `preview` / `deploy` scripts + Next bump
- `.gitignore` — `.open-next/`, `.wrangler/`

All 5 dynamic route groups (`conditions`, `daily-living`, `plans`, `recipes`,
`symptoms` — each `[slug]`) use `generateStaticParams`, so they prerender as free
static assets. No middleware, no route handlers to special-case.

## Local test note (Windows)
`npm run preview` builds the Worker and serves it on localhost:8787. On Windows
this needs **Developer Mode ON** (Settings → For developers) or an elevated
terminal — OpenNext creates symlinks during bundling and Windows blocks that for
normal users (`EPERM: symlink`). This does NOT affect Cloudflare's own build,
which runs on Linux. Skipping local preview is fine; the Next build passes
cleanly on this machine.

## One-time setup (~30 min + DNS wait)

### A. Create the Worker from GitHub
1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Workers**
   → **Import a repository**.
2. Connect GitHub `futurebanker11-cmyk` → pick **thevitatrack** (branch `main`).
3. Build settings:
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx opennextjs-cloudflare deploy`
4. **Save and Deploy** → first build takes a few minutes → you get a
   `thevitatrack.<your-subdomain>.workers.dev` URL. Open it and check the
   homepage + one condition/recipe page before touching DNS.

### B. Move the domain
1. Cloudflare dashboard home → **Add a domain** → `thevitatrack.com` → **Free** plan.
2. It scans/imports existing DNS records → Continue. **Delete** any old A /
   CNAME records for `thevitatrack.com` / `www` pointing at Vercel
   (`76.76.21.21` / `cname.vercel-dns.com`).
3. Cloudflare shows **two nameservers** (like `xxx.ns.cloudflare.com`).
4. At the registrar for thevitatrack.com → DNS / Nameservers → replace the
   current nameservers with those two. Wait for Cloudflare's "site is active"
   email (minutes to a few hours).
5. Workers & Pages → thevitatrack → **Settings → Domains & Routes** → **Add** →
   Custom domain → `thevitatrack.com`. Add `www.thevitatrack.com` the same way.
   Certificates are automatic.

### C. Verify after it's live
- https://thevitatrack.com (homepage) + one page from each dynamic group
- https://thevitatrack.com/ads.txt (AdSense)
- https://thevitatrack.com/sitemap.xml and /sitemap-0.xml
- https://thevitatrack.com/robots.txt
- In Vercel: project Settings → Domains → remove thevitatrack.com (cleanup only).

## Day-to-day
`git push` to `main` → Cloudflare builds and deploys automatically. Manual deploy
from this machine: `npm run deploy` (needs `npx wrangler login` once, and
Developer Mode ON for the local build step).

## Limits & the ISR note
- Free tier: **unlimited static requests/bandwidth** (all prerendered pages +
  assets), **100k dynamic Worker requests/day**. Since every route here is
  prerendered, almost all traffic is free static.
- ISR is a **no-op** in this setup: prerendered pages stay frozen until the next
  deploy. To enable true background revalidation later, add R2 and switch
  `open-next.config.ts` to the R2 incremental cache (snippet commented in that
  file; needs a card on file, $0 within the 10 GB free allowance).
- If dynamic traffic ever exceeds 100k/day: Workers Paid is $5/month for 10M
  requests/month.
