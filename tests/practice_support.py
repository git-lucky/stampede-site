from pathlib import Path
import re

from browser_support import SIZES, WebKitCase


def luminance(rgb):
    values = [int(v) / 255 for v in re.findall(r"\d+", rgb)[:3]]
    values = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in values]
    return sum(v * w for v, w in zip(values, (.2126, .7152, .0722)))


class PracticeCase(WebKitCase):
    def open_phone(self, page):
        # Exercise the same challenge tests before and after the disclosure exists.
        toggle = page.locator("#practice-toggle")
        if toggle.count():
            toggle.focus()
            toggle.press("Enter")
        page.locator("#pp").scroll_into_view_if_needed()

