from pathlib import Path
import re

from browser_support import SIZES
from practice_support import PracticeCase, luminance


class Practice(PracticeCase):
    def test_A09_phone_starts_closed_and_defers_its_media(self):
        for size in SIZES:
            for motion in ("reduce", "no-preference"):
                with self.subTest(size=size, motion=motion), self.page_at(size, motion=motion) as page:
                    requests = []
                    page.on("request", lambda request: requests.append(request.url))
                    self.visit(page, "/")
                    page.locator(".practice").scroll_into_view_if_needed()
                    self.screenshot(page, f"A09-practice-closed-{motion}")
                    # The four separate example cards are deliberately unchanged.
                    card_images = {"tower.webp", "kerplunk.webp", "golf.webp", "lot.webp"}
                    phone_media = [url for url in requests if "/img/practice/" in url and url.rsplit("/", 1)[-1] not in card_images]
                    self.assertEqual(phone_media, [])
                    toggle = page.locator("#practice-toggle")
                    self.assertEqual(toggle.get_attribute("aria-expanded"), "false")
                    self.assertEqual(toggle.get_attribute("aria-controls"), "practice-panel")
                    self.assertTrue(page.locator("#practice-panel").evaluate("el => el.inert"))
                    toggle.focus()
                    toggle.press("Enter")
                    self.assertEqual(toggle.get_attribute("aria-expanded"), "true")
                    self.assertTrue(toggle.evaluate("el => el === document.activeElement"))
                    panel = page.locator("#practice-panel")
                    transition = panel.evaluate("el => getComputedStyle(el).transitionDuration")
                    self.assertEqual(transition == "0s", motion == "reduce")
                    page.wait_for_timeout(400)
                    page.locator(".practice").scroll_into_view_if_needed()
                    self.screenshot(page, f"A09-practice-open-{motion}")
                    self.assertTrue(page.locator("#pp").is_visible())
                    self.assertTrue(page.locator("#pp-you img").evaluate("el => el.complete && el.naturalWidth > 0"))
                    toggle.press("Space")
                    self.assertEqual(toggle.get_attribute("aria-expanded"), "false")
                    self.assertTrue(toggle.evaluate("el => el === document.activeElement"))
                    self.visit(page, "/")
                    self.assertEqual(toggle.get_attribute("aria-expanded"), "false")
