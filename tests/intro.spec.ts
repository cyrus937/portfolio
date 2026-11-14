import { test, expect } from "@playwright/test";

test("first-visit intro plays once per session, then never blocks the page", async ({ page }) => {
  await page.goto("/");
  const intro = page.locator("#intro");
  await expect(intro).toBeVisible();
  await expect(intro).toBeHidden({ timeout: 4000 });
  await page.reload();
  await expect(intro).toBeHidden();
});

test("intro is skipped with prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#intro")).toBeHidden();
});
