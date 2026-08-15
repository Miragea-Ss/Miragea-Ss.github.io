"""Eliora local bridge: ComfyUI proxy plus reviewable Canvas Agent/MCP actions.

The bridge binds to loopback only. Browser access is limited to Eliora's local
launcher and official GitHub Pages origin. Agent clients authenticate with the
token written beside this file in ``eliora-agent-connection.json``.
"""
from __future__ import annotations

import json
import secrets
import threading
import time
from collections import deque
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen

COMFY = "http://127.0.0.1:8188"
HOST = "127.0.0.1"
PORT = 8190
MAX_BODY = 2 * 1024 * 1024
MAX_ACTIONS = 200
MAX_ACTION_OPS = 100
AGENT_POLICY_VERSION = "2026-08-15"
ALLOWED_ORIGINS = {
    "https://miragea-ss.github.io",
    "https://miragea-ss.github.io/",
}
TOKEN = secrets.token_urlsafe(32)
LOCK = threading.RLock()
CANVASES: dict[str, dict] = {}
ACTIONS: deque[dict] = deque(maxlen=MAX_ACTIONS)
NEXT_ACTION_ID = 1


def is_allowed_origin(origin: str | None) -> bool:
    if not origin:
        return True  # native local clients authenticate with the token
    if origin in ALLOWED_ORIGINS:
        return True
    try:
        parsed = urlparse(origin)
        return parsed.scheme == "http" and parsed.hostname in {"127.0.0.1", "localhost"}
    except ValueError:
        return False


def connection_file() -> Path:
    return Path(__file__).with_name("eliora-agent-connection.json")


def write_connection_file() -> None:
    payload = {
        "name": "Eliora Local Canvas Agent",
        "mcp": f"http://{HOST}:{PORT}/mcp",
        "canvasApi": f"http://{HOST}:{PORT}/eliora",
        "token": TOKEN,
        "transport": "MCP Streamable HTTP / JSON-RPC",
        "authentication": "Bearer token",
        "identityVerification": False,
    }
    connection_file().write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


class BridgeHandler(BaseHTTPRequestHandler):
    server_version = "ElioraLocalBridge/2.0"

    def _cors(self) -> dict[str, str]:
        origin = self.headers.get("Origin")
        headers = {
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, MCP-Protocol-Version",
            "Access-Control-Allow-Private-Network": "true",
            "Vary": "Origin",
            "Cache-Control": "no-store",
        }
        if origin and is_allowed_origin(origin):
            headers["Access-Control-Allow-Origin"] = origin
        return headers

    def _send(self, status: int, payload=None, content_type="application/json; charset=utf-8") -> None:
        if isinstance(payload, (dict, list)):
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        elif isinstance(payload, str):
            body = payload.encode("utf-8")
        else:
            body = payload or b""
        self.send_response(status)
        for key, value in self._cors().items():
            self.send_header(key, value)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if body:
            self.wfile.write(body)

    def _json_body(self) -> dict:
        length = int(self.headers.get("Content-Length", 0))
        if length > MAX_BODY:
            raise ValueError("request too large")
        raw = self.rfile.read(length) if length else b"{}"
        value = json.loads(raw.decode("utf-8"))
        if not isinstance(value, dict):
            raise ValueError("JSON object required")
        return value

    def _authorized(self, allow_browser_bootstrap=False) -> bool:
        origin = self.headers.get("Origin")
        if origin and not is_allowed_origin(origin):
            return False
        if allow_browser_bootstrap and origin and is_allowed_origin(origin):
            return True
        supplied = self.headers.get("Authorization", "")
        return secrets.compare_digest(supplied, f"Bearer {TOKEN}")

    def do_OPTIONS(self):
        if not is_allowed_origin(self.headers.get("Origin")):
            self._send(403, {"error": "origin not allowed"})
            return
        self._send(204, b"", "text/plain")

    def do_GET(self):
        if not is_allowed_origin(self.headers.get("Origin")):
            self._send(403, {"error": "origin not allowed"})
            return
        parsed = urlparse(self.path)
        if parsed.path == "/eliora/health":
            self._send(200, {"ok": True, "service": "Eliora Local Bridge", "version": 2, "comfy": COMFY})
            return
        if parsed.path == "/eliora/bootstrap":
            if not self._authorized(allow_browser_bootstrap=True):
                self._send(403, {"error": "origin or token not allowed"})
                return
            self._send(200, {
                "ok": True,
                "token": TOKEN,
                "mcp": f"http://{HOST}:{PORT}/mcp",
                "reviewDefault": True,
                "policyVersion": AGENT_POLICY_VERSION,
                "maxOperations": MAX_ACTION_OPS,
                "deleteAllAllowed": False,
            })
            return
        if parsed.path == "/eliora/canvas/state":
            if not self._authorized():
                self._send(401, {"error": "Bearer token required"})
                return
            query = parse_qs(parsed.query)
            client_id = (query.get("clientId") or [""])[0]
            with LOCK:
                if client_id:
                    state = CANVASES.get(client_id)
                    self._send(200 if state else 404, state or {"error": "canvas not found"})
                else:
                    self._send(200, {"canvases": list(CANVASES.values())})
            return
        if parsed.path == "/eliora/canvas/actions":
            if not self._authorized():
                self._send(401, {"error": "Bearer token required"})
                return
            query = parse_qs(parsed.query)
            client_id = (query.get("clientId") or [""])[0]
            after = int((query.get("after") or ["0"])[0] or 0)
            with LOCK:
                found = [a for a in ACTIONS if a["id"] > after and (not client_id or a["clientId"] == client_id)]
            self._send(200, {"actions": found})
            return
        self._proxy("GET")

    def do_POST(self):
        if not is_allowed_origin(self.headers.get("Origin")):
            self._send(403, {"error": "origin not allowed"})
            return
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/eliora/canvas/state":
                if not self._authorized():
                    self._send(401, {"error": "Bearer token required"})
                    return
                body = self._json_body()
                client_id = str(body.get("clientId", ""))[:128]
                if not client_id:
                    raise ValueError("clientId required")
                safe = {
                    "clientId": client_id,
                    "title": str(body.get("title", "Eliora Canvas"))[:200],
                    "url": str(body.get("url", ""))[:500],
                    "updatedAt": int(time.time() * 1000),
                    "snapshot": body.get("snapshot", {}),
                }
                with LOCK:
                    CANVASES[client_id] = safe
                self._send(200, {"ok": True, "clientId": client_id})
                return
            if parsed.path == "/eliora/canvas/actions":
                if not self._authorized():
                    self._send(401, {"error": "Bearer token required"})
                    return
                body = self._json_body()
                self._send(202, queue_action(body))
                return
            if parsed.path.startswith("/eliora/canvas/actions/") and parsed.path.endswith("/ack"):
                if not self._authorized():
                    self._send(401, {"error": "Bearer token required"})
                    return
                action_id = int(parsed.path.split("/")[-2])
                body = self._json_body()
                with LOCK:
                    action = next((a for a in ACTIONS if a["id"] == action_id), None)
                    if action:
                        action["status"] = str(body.get("status", "acknowledged"))[:40]
                        action["message"] = str(body.get("message", ""))[:500]
                        action["acknowledgedAt"] = int(time.time() * 1000)
                self._send(200 if action else 404, action or {"error": "action not found"})
                return
            if parsed.path == "/mcp":
                if not self._authorized():
                    self._send(401, {"error": "Bearer token required"})
                    return
                self._handle_mcp(self._json_body())
                return
        except (ValueError, json.JSONDecodeError) as error:
            self._send(400, {"error": str(error)})
            return
        self._proxy("POST")

    def _handle_mcp(self, request: dict) -> None:
        request_id = request.get("id")
        method = request.get("method", "")
        if method == "initialize":
            result = {
                "protocolVersion": "2025-06-18",
                "capabilities": {"tools": {"listChanged": False}},
                "serverInfo": {"name": "eliora-local-canvas", "version": "2.0.0"},
            }
        elif method == "notifications/initialized":
            self._send(202, b"", "text/plain")
            return
        elif method == "tools/list":
            result = {"tools": mcp_tools()}
        elif method == "tools/call":
            params = request.get("params") or {}
            result = call_mcp_tool(str(params.get("name", "")), params.get("arguments") or {})
        else:
            self._send(200, {"jsonrpc": "2.0", "id": request_id, "error": {"code": -32601, "message": "Method not found"}})
            return
        self._send(200, {"jsonrpc": "2.0", "id": request_id, "result": result})

    def _proxy(self, method: str) -> None:
        url = f"{COMFY}{self.path}"
        body = None
        if method == "POST":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length) if length else None
        req = Request(url, data=body, method=method)
        for header in ("Content-Type", "Authorization"):
            if self.headers.get(header):
                req.add_header(header, self.headers[header])
        try:
            with urlopen(req, timeout=300) as resp:
                payload = resp.read()
                self._send(resp.status, payload, resp.headers.get("Content-Type", "application/octet-stream"))
        except HTTPError as err:
            self._send(err.code, err.read(), err.headers.get("Content-Type", "text/plain; charset=utf-8"))
        except URLError as err:
            self._send(502, str(err), "text/plain; charset=utf-8")

    def log_message(self, fmt, *args):
        print(fmt % args)


def queue_action(body: dict) -> dict:
    global NEXT_ACTION_ID
    client_id = str(body.get("clientId", ""))[:128]
    ops = body.get("ops")
    if not client_id:
        raise ValueError("clientId required")
    if not isinstance(ops, list) or not ops or len(ops) > MAX_ACTION_OPS:
        raise ValueError(f"ops must contain 1-{MAX_ACTION_OPS} operations")
    allowed = {"add_node", "update_node", "delete_node", "connect_nodes", "delete_connections", "select_nodes", "set_viewport"}
    clean_ops = []
    for op in ops:
        if not isinstance(op, dict) or op.get("type") not in allowed:
            raise ValueError(f"unsupported operation: {op.get('type') if isinstance(op, dict) else 'invalid'}")
        if op.get("type") == "delete_connections" and op.get("all") is True:
            raise ValueError("delete-all is never accepted; list connection IDs")
        if op.get("type") == "delete_node":
            ids = op.get("ids") or ([op.get("id")] if op.get("id") else [])
            if not isinstance(ids, list) or not ids or len(ids) > 50:
                raise ValueError("delete_node requires 1-50 explicit node IDs")
        clean_ops.append(op)
    with LOCK:
        action = {
            "id": NEXT_ACTION_ID,
            "clientId": client_id,
            "summary": str(body.get("summary", "Agent canvas changes"))[:300],
            "ops": clean_ops,
            "status": "pending",
            "policyVersion": AGENT_POLICY_VERSION,
            "createdAt": int(time.time() * 1000),
        }
        NEXT_ACTION_ID += 1
        ACTIONS.append(action)
    return {"ok": True, "action": action, "reviewRequired": True, "policyVersion": AGENT_POLICY_VERSION}


def mcp_tools() -> list[dict]:
    return [
        {
            "name": "eliora_list_canvases",
            "description": "List active Eliora canvas tabs. No identity verification or cloud account is required.",
            "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
        },
        {
            "name": "eliora_get_canvas",
            "description": "Read a structured snapshot of an active Eliora canvas.",
            "inputSchema": {"type": "object", "properties": {"clientId": {"type": "string"}}, "required": ["clientId"], "additionalProperties": False},
        },
        {
            "name": "eliora_propose_canvas_ops",
            "description": "Propose structured canvas changes. Compose scope is default (no delete); Full scope still requires browser review. Delete-all is never accepted and approved changes are undoable.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "clientId": {"type": "string"},
                    "summary": {"type": "string"},
                    "ops": {"type": "array", "minItems": 1, "maxItems": MAX_ACTION_OPS, "items": {"type": "object"}},
                },
                "required": ["clientId", "ops"],
                "additionalProperties": False,
            },
        },
    ]


def text_result(value) -> dict:
    return {"content": [{"type": "text", "text": json.dumps(value, ensure_ascii=False)}], "structuredContent": value}


def call_mcp_tool(name: str, args: dict) -> dict:
    if name == "eliora_list_canvases":
        with LOCK:
            return text_result({"canvases": [{k: v for k, v in item.items() if k != "snapshot"} for item in CANVASES.values()]})
    if name == "eliora_get_canvas":
        with LOCK:
            state = CANVASES.get(str(args.get("clientId", "")))
        return text_result(state or {"error": "canvas not found"})
    if name == "eliora_propose_canvas_ops":
        return text_result(queue_action(args))
    return {"isError": True, "content": [{"type": "text", "text": f"Unknown tool: {name}"}]}


if __name__ == "__main__":
    write_connection_file()
    print(f"Eliora Local Bridge: http://{HOST}:{PORT} -> ComfyUI {COMFY}")
    print(f"MCP endpoint: http://{HOST}:{PORT}/mcp")
    print(f"Agent connection file: {connection_file()}")
    print("Localhost only. Browser writes require review and remain undoable.")
    ThreadingHTTPServer((HOST, PORT), BridgeHandler).serve_forever()
