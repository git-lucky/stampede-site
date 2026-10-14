from pathlib import Path

from browser_support import SIZES
from practice_support import PracticeCase


class Practice(PracticeCase):
    def test_A07_closing_video_stops_playback(self):
        for size in SIZES:
            with self.subTest(size=size), self.page_at(size) as page:
                self.visit(page, "/")
                self.open_phone(page)
                page.locator('.pp-row[data-kind="video"]').click()
                page.locator("#pp-file").set_input_files(Path(__file__).parent / "fixtures/practice.mp4")
                page.locator("#pp-card video").evaluate("async v => { v.muted = true; await v.play(); }")
                page.wait_for_function("document.querySelector('#pp-card video').currentTime > 0.1")
                page.locator("#pp-card-close").click()
                before = page.locator("#pp-card video").evaluate("v => ({time: v.currentTime, paused: v.paused})")
                page.wait_for_timeout(250)
                after = page.locator("#pp-card video").evaluate("v => v.currentTime")
                self.assertTrue(before["paused"])
                self.assertAlmostEqual(before["time"], after, delta=.05)

