# Vic's UGC

The creative platform to direct your best work — AI image, video, audio and
cinema generation behind a single studio interface.

**Live:** https://vics-ugc-production.up.railway.app

---

## What's in here

Two things are served from one Next.js app:

| Route | What it is |
|---|---|
| `/` | The marketing landing page — a static document in `public/marketing/`, served by a rewrite in `middleware.js` |
| `/studio` | The studio app itself: image, video, audio, cinema, agents and workflow tools |
| `/zh/...` | The same studio under the Chinese locale |

Generation is powered by [MuAPI](https://muapi.ai), which fronts 200+ models
(Flux, Midjourney, Kling, Veo, Seedance and others). Requests are proxied
through `app/api/` so the API key never has to be embedded in the client
bundle.

## Studios

- **Images** — Image Studio, Layers Studio, Cinema Studio, Design Agent, AI Influencer Studio
- **Video** — Video Studio, AI Clipping, Motion Control, Vibe Motion, Lip Sync, Body Swap, Marketing
- **Audio** — voice, music and sound effects
- **Agents & Automation** — agent chat and the node-based workflow builder

## Running it locally

```bash
npm run setup     # submodules + install + build the workspace packages
npm run dev       # http://localhost:3000
```

`npm run setup` is only needed the first time. After that:

```bash
npm run dev       # development
npm run build     # production build
npm start         # serve the production build
```

The studio asks for a MuAPI key on first load and keeps it in `localStorage`;
there is no account system. **Log out** in the sidebar clears that key and
returns to the landing page.

## Layout

```
app/                    Next.js routes — studio, agents, workflow, API proxies
components/
  StandaloneShell.js    The studio shell: sidebar, tabs, notifications, settings
  ApiKeyModal.js        First-run key entry
lib/locales.js          Locale registry; copy lives in messages/<locale>/
messages/               Translated copy bundles (en, zh)
packages/               Workspace packages — studio, workflow builder, agents, design agent
public/marketing/       The landing page document, hero video and social card
middleware.js           Landing-page rewrite, API proxying, security headers
```

### The landing page

`public/marketing/index.html` is a static document. Its appearance is adjusted
at runtime by two blocks near the end of the file:

- `<style id="vic-overrides">` — layout and branding overrides
- `<script id="vic-overrides-js">` — swaps in the hero video, applies branding,
  renders the footer, and makes the header nav inert

Both are commented inline. Because the page rehydrates, changes made only in
the markup can be undone by a re-render — that's why several rules are applied
from both places.

## Localisation

English is the default, unprefixed route tree. Every other locale gets a
parallel tree (`app/zh/...`) that reuses the same components with translated
copy passed as a prop. Add a locale by registering it in `lib/locales.js` and
adding `messages/<locale>/common.json`. Don't branch on `locale === '...'`
inside shared components — read the copy from the registry instead.

## Deployment

Deployed on Railway from this repository via the included `Dockerfile`. Pushes
to `main` trigger a build. Set `MUAPI_KEY` in the service environment if you
want a key baked in rather than entered per-browser.

## Licence and attribution

MIT — see [LICENSE](LICENSE).

Built on [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI)
by the Open Generative AI Contributors, used under the MIT licence. The MIT
terms require that the copyright notice stay with the code, so please leave
`LICENSE` in place.
