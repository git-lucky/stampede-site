import re

from browser_support import SIZES
from practice_support import PracticeCase, luminance


class Practice(PracticeCase):
    def test_A05_completed_labels_and_points_have_readable_contrast(self):
        for size in SIZES:
            with self.subTest(size=size), self.page_at(size) as page:
                self.visit(page, "/")
                self.open_phone(page)
                page.locator('.pp-row[data-kind="photo"]').click()
                page.locator("#pp-sample").click()
                page.locator("#pp-bar").click()
                page.wait_for_function("document.querySelector('.pp-row.done') !== null")
                self.screenshot(page, "A05-completed", locator=page.locator(".pp-device"))
                page.locator(".pp-device").evaluate("el => el.scrollIntoView({block: 'start'})")
                self.screenshot(page, "A05-completed-page")
                for selector, background in ((".pp-row.done .pp-name", "#pp"), (".pp-row.done .pp-kind", "#pp"), (".pp-pts small", "#pp-tag")):
                    colors = page.evaluate("""([selector, background]) => ({
                        text: getComputedStyle(document.querySelector(selector)).color,
                        opacity: getComputedStyle(document.querySelector(selector)).opacity,
                        background: getComputedStyle(document.querySelector(background)).backgroundColor
                    })""", [selector, background])
                    foreground = [int(v) for v in re.findall(r"\d+", colors["text"])[:3]]
                    back = [int(v) for v in re.findall(r"\d+", colors["background"])[:3]]
                    alpha = float(colors["opacity"])
                    mixed = f"rgb({','.join(str(round(f * alpha + b * (1-alpha))) for f, b in zip(foreground, back))})"
                    a, b = luminance(mixed), luminance(colors["background"])
                    self.assertGreaterEqual((max(a,b)+.05)/(min(a,b)+.05), 4.5, colors)
