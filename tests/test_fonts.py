from browser_support import SIZES, WebKitCase


class Fonts(WebKitCase):
    def test_cold_homepage_uses_compressed_fonts(self):
        for size in SIZES:
            with self.subTest(size=size), self.page_at(size) as page:
                self.visit(page, "/")
                self.screenshot(page, "A09-home")
                page.locator("#how").scroll_into_view_if_needed()
                self.screenshot(page, "A09-how")
                fonts = page.evaluate("""() => Object.fromEntries(performance.getEntriesByType('resource')
                    .filter(r => r.name.includes('/fonts/')).map(r => [r.name, r.encodedBodySize]))""")
                self.assertTrue(fonts)
                self.assertTrue(all(url.endswith(".woff2") for url in fonts), fonts)
                self.assertLess(sum(fonts.values()), 250000, fonts)
