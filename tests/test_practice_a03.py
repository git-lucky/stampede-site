from browser_support import SIZES
from practice_support import PracticeCase


class Practice(PracticeCase):
    def test_A03_fast_reopen_survives_previous_close(self):
        for size in SIZES:
            with self.subTest(size=size), self.page_at(size, motion="no-preference") as page:
                self.visit(page, "/")
                self.open_phone(page)
                row = page.locator('.pp-row[data-kind="photo"]')
                row.focus()
                for _ in range(3):
                    page.keyboard.press("Enter")
                    page.keyboard.press("Escape")
                    page.keyboard.press("Enter")
                    page.wait_for_timeout(500)  # Beyond the original 340 ms stale timer.
                    self.assertFalse(page.locator("#pp-card").evaluate("el => el.hidden"))
                    page.keyboard.press("Escape")
                    page.wait_for_timeout(400)

