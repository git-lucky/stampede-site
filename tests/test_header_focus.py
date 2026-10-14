from browser_support import SIZES, WebKitCase


class HeaderFocus(WebKitCase):
    def test_keyboard_focus_contrasts_with_header_and_open_menu(self):
        for size in SIZES:
            with self.subTest(size=size), self.page_at(size) as page:
                self.visit(page, "/")
                page.keyboard.press("Tab")  # Establish keyboard focus styling.
                measurements = []
                controls = [page.locator(".header-brand")]
                if size[0] < 1040:
                    controls.append(page.locator("[data-menu]"))
                controls.extend(page.locator(".site-nav a").all())
                for index, focused in enumerate(controls):
                    focused.focus()
                    self.assertTrue(focused.evaluate("el => el.matches(':focus-visible')"))
                    self.assertTrue(focused.evaluate("el => !!el.closest('.site-head')"))
                    self.screenshot(page, f"A04-focus-{index}")
                    measurements.append(focused.evaluate(r"""el => {
                        const style = getComputedStyle(el);
                        let parent = el.parentElement;
                        while (getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') parent = parent.parentElement;
                        const luminance = color => {
                            const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => {
                                v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
                            });
                            return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
                        };
                        const a = luminance(style.outlineColor), b = luminance(getComputedStyle(parent).backgroundColor);
                        return {contrast: (Math.max(a,b)+.05)/(Math.min(a,b)+.05), width: parseFloat(style.outlineWidth)};
                    }"""))
                    if focused.get_attribute("data-menu") is not None:
                        page.keyboard.press("Enter")
                for item in measurements:
                    self.assertGreaterEqual(item["contrast"], 3, item)
                    self.assertGreaterEqual(item["width"], 2, item)
