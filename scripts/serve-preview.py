#!/usr/bin/env python3
"""
Sert out/ en local pour l'aperçu, SANS cache navigateur (Cache-Control: no-store),
pour ne jamais revoir une ancienne version après un build.

  python3 scripts/serve-preview.py [port]   (défaut 4231)
"""
import functools, http.server, os, sys

class NoStore(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 4231
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")
http.server.ThreadingHTTPServer(("", port), functools.partial(NoStore, directory=root)).serve_forever()
