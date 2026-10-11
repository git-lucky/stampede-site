from browser_support import SIZES
from practice_support import PracticeCase


class Practice(PracticeCase):
    def test_A02_modal_contains_focus_and_restores_opener(self):
        for size in SIZES:
            for kind in ("photo", "trivia", "choice", "video"):
                with self.subTest(size=size, kind=kind), self.page_at(size) as page:
                    self.visit(page, "/")
                    self.open_phone(page)
                    row = page.locator(f'.pp-row[data-kind="{kind}"]')
                    row.focus()
                    row.press("Enter")
                    self.screenshot(page, f"A02-{kind}", locator=page.locator(".pp-device"))
                    page.locator("#pp-card-close").focus()
                    page.keyboard.press("Shift+Tab")
                    self.assertTrue(page.evaluate("document.querySelector('#pp-card').contains(document.activeElement)"))
                    page.locator("#pp-bar").focus()
                    page.keyboard.press("Tab")
                    self.assertTrue(page.evaluate("document.querySelector('#pp-card').contains(document.activeElement)"))
                    page.locator(".header-brand").evaluate("el => el.focus()")
                    self.assertTrue(page.evaluate("document.querySelector('#pp-card').contains(document.activeElement)"))
                    page.keyboard.press("Escape")
                    self.assertTrue(row.evaluate("el => el === document.activeElement"))
                    page.wait_for_function("document.querySelector('#pp-card').hidden")
                    row.click()
                    page.locator("#pp-card-close").click()
                    self.assertTrue(row.evaluate("el => el === document.activeElement"))

