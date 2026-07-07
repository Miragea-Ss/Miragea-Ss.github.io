# Atelier Agent Sources

This site is a **serious business entry point**, not a demo or play homepage.

## Trust rules (mandatory)

1. **Verified sources only** — every contest, event, and link must point to an official page (Runway Help, Luma, X post URL, etc.).
2. **No fabricated names** — never invent contest titles, deadlines, or metrics.
3. **Show timeliness** — use `period` for human-readable dates; use `deadline` for expiry. Expired items are marked `[Ended]` on the site automatically.
4. **Closed ≠ active** — do not list ended submission windows (e.g. AIF 2026 film entry closed Apr 27, 2026) as open contests.

## Edit → export → push

```bash
# Quick add (verified URL required)
npm run agents:add -- contest --title "Runway Daily Challenge" --url "https://help.runwayml.com/..." --ongoing
npm run agents:add -- publish --title "Work title" --url "https://x.com/Miragea_S/status/..."

npm run agents:export
npm run agents:validate
npm run build
```

| File | Agent | When to edit |
|------|-------|--------------|
| `contests.yaml` | campaign-watcher | Verified contest / event / signal |
| `production-log.yaml` | production-recorder | After a documented production session |
| `publish-manifest.yaml` | work-distributor | When a work is published (with real URL) |
| `ideas.yaml` | idea-miner | When scoring a verified public AI case |

GitHub Action `agent-sync.yml` runs every Monday 06:00 UTC and when `agents/**` changes.