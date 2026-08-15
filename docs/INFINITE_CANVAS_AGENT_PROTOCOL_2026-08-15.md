# Eliora Infinite Canvas Agent Protocol

Policy version: `2026-08-15`

The protocol is local-first and requires no Chinese real-name verification, Eliora account, or cloud identity. An Agent connects through the loopback-only Eliora Bridge (`127.0.0.1:8190`) with a per-launch bearer token. The browser remains the authority for every write.

## Permission model

- `Off`: no Agent connection.
- `Review required` + `Compose`: default. Add, update, connect, select, and viewport proposals are allowed; deletion is blocked.
- `Review required` + `Full`: explicit deletion may be proposed, but every proposal still requires browser approval.
- `delete-all` is never accepted.
- A proposal contains 1–100 operations; one delete operation may name at most 50 explicit node IDs.
- Approved writes enter browser undo history and a local audit record. Rejected and blocked proposals are also audited.

## Operations

- `add_node`: flat fields or `node: { id, kind, title, text, x, y, tags, color, url, imageId }`.
- `update_node`: `id` plus `patch: { title, text, x, y, tags, color }`.
- `delete_node`: `id` or `ids`; Full scope only.
- `connect_nodes`: `fromNodeId`, `toNodeId`, optional `id` and `label`.
- `delete_connections`: explicit `id` or `ids`; Full scope only.
- `select_nodes`: `ids`.
- `set_viewport`: `viewport: { x, y, z }`.

Unknown operations, non-finite coordinates, duplicate IDs, invalid connections, oversized text, excessive operation counts, missing targets, and bulk delete requests are blocked before approval.

## MCP tools

- `eliora_list_canvases`: list active tabs without exposing their full board contents.
- `eliora_get_canvas`: read one structured canvas snapshot, including the active policy and rendering state.
- `eliora_propose_canvas_ops`: queue reviewable structured operations. It never applies changes directly.

The bridge and browser validate independently. This defense-in-depth rule ensures a client cannot bypass review by calling the HTTP or MCP endpoint directly.
