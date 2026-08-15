# Eliora Infinite Canvas Product Charter

Updated: 2026-08-15

This charter is the durable product boundary for Eliora Infinite Canvas. New
features, connectors, workflows, agents, and UI changes must comply with it.

## Non-negotiable rules

1. No Chinese real-name-verification service is required for any core path.
2. Local ComfyUI and llama.cpp remain first-class default engines.
3. International BYOK endpoints such as OpenRouter and open protocols remain
   available without creating an Eliora account.
4. AI agents may read and propose canvas operations through MCP/A2A, but every
   write is reviewable, rejectable, tab-isolated, and undoable by default.
5. ComfyUI API and UI workflow JSON can be imported freely. Imported JSON is
   preserved; CJK prompts, DEV fields, and custom-node metadata are not erased.
6. The product follows current ComfyUI development through capability probing
   and graceful warnings. It does not lock the customer to one model recipe.
7. The customer UI must be immediately understandable, clean, and beautiful.
   Diagnostics belong in Log/operator surfaces, not across the canvas.

## Product promise

Eliora is a local-first AI production canvas: place work, connect context,
import any current ComfyUI graph, let an agent propose changes, review them,
and run with local GPU or an international BYOK provider.

## Acceptance checks for every release

- Public viewing stays calm when localhost services are offline.
- Local mode works without an account or identity verification.
- Importing a multilingual/custom-node JSON preserves its original content.
- API-format and UI-format ComfyUI workflows remain detectable.
- Missing DEV/custom nodes are warnings on import and actionable errors on run.
- Agent writes cannot bypass review mode by default.
- Main actions are visible; advanced configuration stays secondary.
- Desktop and mobile screenshots show no overlapping controls or diagnostics.

## Explicitly out of scope

- Jimeng, Volcengine face authentication, or other China real-name-required
  services as core or recommended dependencies.
- A fixed Stable Diffusion-era workflow as the product architecture.
- Silent modification of imported workflow prompts or custom-node metadata.
- Autonomous agent writes without a user-visible approval and undo path.
