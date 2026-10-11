"""Local WebKit checks. Run after building and starting `pnpm preview`.

python -m unittest discover -s tests -v
Requires playwright==1.63.0 and its WebKit browser. BASE_URL defaults to
http://127.0.0.1:4321. Set SCREENSHOT_DIR to save review screenshots.
"""
from contextlib import contextmanager
import os
from pathlib import Path
import unittest
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright

SIZES = [(1440, 900), (390, 844)]
BASE = os.environ.get("BASE_URL", "http://127.0.0.1:4321").rstrip("/")
assert urlsplit(BASE).hostname in ("localhost", "127.0.0.1"), "Local testing only"


class WebKitCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.webkit.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    @contextmanager
    def page_at(self, size, *, javascript=True, block_scripts=False, motion="reduce"):
        context = self.browser.new_context(
            viewport=dict(zip(("width", "height"), size)),
            java_script_enabled=javascript, reduced_motion=motion,
        )
        errors = []
        def route(request):
            url = urlsplit(request.request.url)
            if url.scheme in ("blob", "data"):
                request.continue_()
            elif (url.netloc != urlsplit(BASE).netloc
                    or (block_scripts and request.request.resource_type == "script")):
                request.abort()
            else:
                request.continue_()
        context.route("**/*", route)
        page = context.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        try:
            yield page
            self.assertEqual(errors, [], "Browser script errors")
        finally:
            context.close()

    def visit(self, page, path):
        response = page.goto(BASE + path, wait_until="networkidle")
        self.assertEqual(response.status, 200)
        page.evaluate("document.fonts.ready")

    def screenshot(self, page, name, *, locator=None):
        directory = os.environ.get("SCREENSHOT_DIR")
        if directory:
            path = Path(directory)
            path.mkdir(parents=True, exist_ok=True)
            size = page.viewport_size
            target = locator or page
            target.screenshot(path=str(path / f"{name}-{size['width']}x{size['height']}.png"))
