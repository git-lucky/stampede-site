from browser_support import BASE, SIZES, WebKitCase


class PlannerFallback(WebKitCase):
    def test_no_native_submission_when_javascript_is_unavailable(self):
        # Removing the disabled fallback or relying on JS alone leaks a GET.
        for size in SIZES:
            for path in ("/", "/plan/"):
                for mode in ("disabled", "blocked"):
                    with self.subTest(size=size, path=path, mode=mode), self.page_at(
                        size, javascript=mode != "disabled", block_scripts=mode == "blocked"
                    ) as page:
                        self.visit(page, path)
                        page.locator("#planner-fields").evaluate("el => el.open = true")
                        page.locator("#plan-form .extras summary").click()
                        page.locator("#city").fill("Example Town")
                        page.locator("#note").fill("Private test note")
                        if path == "/plan/":
                            page.locator("#name").fill("Safari Guest")
                            page.locator("#email").fill("guest@example.invalid")
                        button = page.locator('#plan-form button[type="submit"]')
                        button.scroll_into_view_if_needed()
                        self.screenshot(page, f"A01-{mode}-{'home' if path == '/' else 'plan'}")
                        documents = []
                        def stop_submission(route):
                            documents.append(route.request.method)
                            route.abort()
                        page.route("**/*", lambda route: stop_submission(route)
                                   if route.request.is_navigation_request() else route.continue_())
                        page.locator("#city").press("Enter")
                        if button.is_enabled():
                            button.click()
                        page.wait_for_timeout(150)
                        self.assertEqual(documents, [], "Native submission must fail closed")
                        self.assertEqual(page.url, BASE + path)
                        self.assertTrue(button.is_disabled())
                        self.assertEqual(page.locator("#plan-form").get_attribute("method"), "post")
                        self.assertTrue(page.locator("#planner-unavailable").is_visible())
