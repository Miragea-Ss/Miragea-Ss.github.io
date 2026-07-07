# Atelier Agent Sources

Agents do not poll X in v1. Edit these YAML files, then export status JSON:

```bash
npm run agents:export
npm run agents:validate
```

| File | Agent | When to edit |
|------|-------|--------------|
| `contests.yaml` | campaign-watcher | New contest / investor signal (weekly) |
| `production-log.yaml` | production-recorder | After a large work production session |
| `publish-manifest.yaml` | work-distributor | When a work is published to channels |
| `ideas.yaml` | idea-miner | When scoring a public AI case |

GitHub Action `agent-sync.yml` runs every Monday 06:00 UTC and on manual dispatch.