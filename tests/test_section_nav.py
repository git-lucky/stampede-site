from browser_support import SIZES, WebKitCase


class SectionNavigation(WebKitCase):
    def test_section_links_clear_sticky_header(self):
        for size in SIZES:
            for target in ("how", "expeditions", "occasions", "plan", "formats"):
                with self.subTest(size=size, target=target), self.page_at(size) as page:
                    self.visit(page, "/cities/chicago/" if target == "formats" else "/")
                    if target != "formats" and size[0] < 1040:
                        page.locator("[data-menu]").click()
                    link = page.locator(f'a[href="#{target}"]')
                    if target != "formats":
                        link = page.locator(f'.site-nav a[href="#{target}"]')
                    link.first.click()
                    page.wait_for_function("id => location.hash === '#' + id", arg=target)
                    self.screenshot(page, f"A08-{target}")
                    positions = page.evaluate("""id => ({
                        heading: document.querySelector('#' + id + ' h2').getBoundingClientRect().top,
                        header: document.querySelector('.site-head').getBoundingClientRect().bottom
                    })""", target)
                    self.assertGreaterEqual(positions["heading"], positions["header"], positions)
