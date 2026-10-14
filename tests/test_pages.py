from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from browser_support import BASE, SIZES, WebKitCase


class PagesAndPlanner(WebKitCase):
    def test_all_built_pages_load_without_script_errors_or_overflow(self):
        pages = sorted(Path("dist").rglob("*.html"))
        self.assertGreater(len(pages), 0, "Run pnpm build first")
        for size in SIZES:
            with self.page_at(size) as page:
                for file in pages:
                    path = "/" + file.relative_to("dist").as_posix().removesuffix("index.html")
                    with self.subTest(size=size, path=path):
                        self.visit(page, path)
                        self.assertTrue(page.title())
                        self.assertEqual(page.locator("h1").count(), 1)
                        self.assertTrue(page.locator("main").is_visible())
                        self.assertTrue(page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"))
                self.assertEqual(page.goto(BASE + "/missing-smoke-page/").status, 404)

    def test_planner_draft_presets_edit_restart_and_safe_text(self):
        for size in SIZES:
            for path in ("/", "/plan/?city=Example%20Town&package=scout&occasion=Celebration"):
                with self.subTest(size=size, path=path), self.page_at(size) as page:
                    self.visit(page, path)
                    page.locator("#planner-fields").evaluate("el => el.open = true")
                    if path == "/":
                        page.locator('label:has(input[value="Celebration"])').click()
                        page.locator('label:has(input[value="Scout"])').click()
                        page.locator("#city").fill("Example Town")
                    else:
                        self.assertEqual(page.locator("#city").input_value(), "Example Town")
                        self.assertTrue(page.locator('input[value="Scout"]').is_checked())
                        self.assertTrue(page.locator('input[value="Celebration"]').is_checked())
                    page.locator("#group").fill("24")
                    page.locator("#plan-form .extras summary").click()
                    page.locator("#note").fill("<b>Safari & friends</b>")
                    if path != "/":
                        page.locator("#name").fill("Safari Guest")
                        page.locator("#email").fill("guest@example.invalid")
                    page.locator('#plan-form button[type="submit"]').click()
                    self.assertTrue(page.locator("#result").is_visible())
                    self.assertEqual(page.locator("#summary b").count(), 0)
                    draft = urlsplit(page.locator("#send-email").get_attribute("href"))
                    self.assertEqual(draft.scheme, "mailto")
                    self.assertEqual(draft.path, "mike@urbansafari.app")
                    body = parse_qs(draft.query)["body"][0]
                    for text in ("Occasion: Celebration", "Style: Scout", "About 24 people", "City: Example Town", "<b>Safari & friends</b>"):
                        self.assertIn(text, body)
                    self.assertEqual(page.url, BASE + path)
                    page.locator("[data-edit]").click()
                    self.assertEqual(page.locator("#group").input_value(), "24")
                    page.locator("#group").fill("25")
                    page.locator('#plan-form button[type="submit"]').click()
                    self.assertIn("About 25 people", page.locator("#summary").inner_text())
                    page.locator("[data-restart]").click()
                    self.assertEqual(page.locator("#group").input_value(), "")
                    self.assertEqual(page.locator("#city").input_value(), "")
