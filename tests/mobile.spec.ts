import { test, expect } from "./fixtures";

test("mobile menu navigates and exposes the 3-way theme switch", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("radio", { name: "Auto" }).last()).toBeVisible();
  await page.getByRole("link", { name: /Projects/ }).last().click();
  await expect(page.locator("#projects")).toBeInViewport();
});

test("no horizontal overflow on key pages", async ({ page }) => {
  for (const path of ["/", "/projects/testforge", "/blog/notebook-to-production"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
