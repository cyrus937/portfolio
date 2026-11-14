import { test as base, expect } from "@playwright/test";

/**
 * - Skips the first-visit intro overlay (tested separately).
 * - Fails any test that logs a console error or throws (hydration mismatches included).
 */
export const test = base.extend<{ errors: string[] }>({
  // page.goto() also waits until React has hydrated the pre-rendered HTML.
  page: async ({ page }, use) => {
    const goto = page.goto.bind(page);
    page.goto = async (url, opts) => {
      const res = await goto(url, opts);
      await page.locator("html[data-hydrated]").waitFor({ state: "attached" });
      return res;
    };
    await use(page);
  },
  errors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      await page.addInitScript(() => sessionStorage.setItem("ck-intro", "1"));
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
