from browser_support import SIZES, WebKitCase


class PlannerValidation(WebKitCase):
    def test_errors_are_announced_associated_and_cleared(self):
        for size in SIZES:
            for path in ("/", "/plan/?city=Example%20Town"):
                with self.subTest(size=size, path=path), self.page_at(size) as page:
                    self.visit(page, path)
                    page.locator("#planner-fields").evaluate("el => el.open = true")
                    page.locator("#city").fill("")
                    page.locator('#plan-form button[type="submit"]').click()
                    label = 'home' if path == '/' else 'plan'
                    page.locator("#plan-form").evaluate("el => el.scrollIntoView({block: 'start'})")
                    self.screenshot(page, f"A06-{label}-errors-top")
                    page.locator(".form-foot").evaluate("el => el.scrollIntoView({block: 'end'})")
                    self.screenshot(page, f"A06-{label}-errors-bottom")
                    hint = page.locator("#form-hint")
                    self.assertEqual(hint.get_attribute("role"), "alert")
                    self.assertIn("Still to answer", hint.inner_text())
                    self.assertEqual(page.locator(":focus").get_attribute("name"), "occasion")
                    for name in ("occasion", "style", "group", "city"):
                        controls = page.locator(f'#plan-form [name="{name}"]')
                        for control in controls.all():
                            self.assertIsNotNone(control.get_attribute("required"))
                            self.assertEqual(control.get_attribute("aria-invalid"), "true")
                            ids = (control.get_attribute("aria-describedby") or "").split()
                            self.assertIn(name + "-err", ids)
                        self.assertTrue(page.locator(f"#{name}-err").is_visible())
                    page.locator('label:has(input[name="occasion"])').first.click()
                    page.locator('label:has(input[name="style"])').first.click()
                    for invalid in ("1", "2.5", "2001"):
                        page.locator("#group").fill(invalid)
                        page.locator("#city").click()
                        self.assertEqual(page.locator("#group").get_attribute("aria-invalid"), "true")
                    page.locator("#group").fill("24")
                    page.locator("#city").fill("Example Town")
                    self.assertEqual(page.locator('#plan-form [aria-invalid="true"]').count(), 0)
                    self.assertEqual(page.locator("#plan-form .err:visible").count(), 0)
                    self.assertNotIn("Still to answer", hint.inner_text())
                    if path != "/":
                        self.assertIn("city-help", page.locator("#city").get_attribute("aria-describedby"))
                    page.locator('#plan-form button[type="submit"]').click()
                    self.assertTrue(page.locator("#result").is_visible())
                    page.locator("[data-restart]").click()
                    self.assertEqual(page.locator('#plan-form [aria-invalid="true"]').count(), 0)
                    self.assertEqual(page.locator("#plan-form .err:visible").count(), 0)
