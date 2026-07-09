"""Eliora ComfyUI bridge — CORS + Private Network Access for Infinite Canvas."""
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.request import Request, urlopen
from urllib.error import URLError

COMFY = "http://127.0.0.1:8188"
HOST = "127.0.0.1"
PORT = 8190


class BridgeHandler(BaseHTTPRequestHandler):
    def _cors(self):
        origin = self.headers.get("Origin") or "*"
        return {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Private-Network": "true",
            "Vary": "Origin",
        }

    def do_OPTIONS(self):
        self.send_response(204)
        for key, value in self._cors().items():
            self.send_header(key, value)
        self.end_headers()

    def do_GET(self):
        self._proxy("GET")

    def do_POST(self):
        self._proxy("POST")

    def _proxy(self, method):
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
                self.send_response(resp.status)
                for key, value in self._cors().items():
                    self.send_header(key, value)
                content_type = resp.headers.get("Content-Type", "application/octet-stream")
                self.send_header("Content-Type", content_type)
                self.end_headers()
                self.wfile.write(payload)
        except URLError as err:
            msg = str(err).encode("utf-8", errors="replace")
            self.send_response(502)
            for key, value in self._cors().items():
                self.send_header(key, value)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(msg)

    def log_message(self, fmt, *args):
        print(fmt % args)


if __name__ == "__main__":
    print(f"Eliora Comfy bridge: http://{HOST}:{PORT} -> {COMFY}")
    print("Leave this window open while using Infinite Canvas from GitHub Pages.")
    HTTPServer((HOST, PORT), BridgeHandler).serve_forever()
