import { test, expect } from "./fixtures";

const pages = [
  { path: "/", lang: "en", title: /Software Engineer/ },
  { path: "/fr", lang: "fr", title: /Ingénieur Logiciel/ },
  { path: "/projects/testforge", lang: "en", title: /TestForge — Case study/ },
  { path: "/fr/projects/icare", lang: "fr", title: /iCare — Étude de cas/ },
  { path: "/blog", lang: "en", title: /Blog/ },
  { path: "/fr/blog/notebook-to-production", lang: "fr", title: /Du notebook à Kubernetes/ },
];

test.describe("pre-rendered pages", () => {
  for (const p of pages) {
    test(`${p.path} is served as complete static HTML`, async ({ page, request }) => {
      // Raw HTML (no JS) already contains the content and SEO tags.
      const res = await request.get(p.path);
      expect(res.status()).toBe(200);
      const html = await res.text();
      expect(html).toContain(`<html lang="${p.lang}"`);
      expect(html).toMatch(/<h1[\s>]/);
      expect(html).toContain('rel="alternate" hreflang="fr"');
      expect(html).toContain('rel="canonical"');

      await page.goto(p.path);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("unknown paths return the 404 page", async ({ request }) => {
    const res = await request.get("/does-not-exist");
    expect(res.status()).toBe(404);
  });

  test("sitemap and RSS feeds list every page", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const p of pages) expect(sitemap).toContain(`<loc>https://cyrus-k.vercel.app${p.path === "/" ? "/" : p.path}</loc>`);
    const rss = await (await request.get("/rss.xml")).text();
    expect(rss.match(/<item>/g)?.length).toBe(2);
    expect(await (await request.get("/fr/rss.xml")).text()).toContain("<language>fr</language>");
  });
});

test.describe("theme", () => {
  test("light / dark / auto are applied and remembered", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const theme = () => page.evaluate(() => document.documentElement.dataset.theme);
    expect(await theme()).toBe("dark");

    await page.getByRole("radio", { name: "Light" }).click();
    await expect.poll(theme).toBe("light");
    await page.reload();
    expect(await theme()).toBe("light");

    await page.getByRole("radio", { name: "Auto" }).click();
    await expect.poll(theme).toBe("dark");
    await page.emulateMedia({ colorScheme: "light" });
    await expect.poll(theme).toBe("light");
  });
});

test.describe("navigation", () => {
  test("language toggle keeps the current page", async ({ page }) => {
    await page.goto("/projects/currency-api");
    await page.getByRole("button", { name: "Switch language" }).click();
    await expect(page).toHaveURL(/\/fr\/projects\/currency-api$/);
    await expect(page).toHaveTitle(/API de conversion de devises/);
  });

  test("nav links from a case study go back to the home section", async ({ page }) => {
    await page.goto("/projects/testforge");
    await page.getByRole("navigation").getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL(/\/#experience$/);
    await expect(page.locator("#experience")).toBeInViewport({ timeout: 10_000 });
  });

  test("project card opens its case study, and 'next' chains them", async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").getByRole("link", { name: "TestForge", exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/testforge$/);
    await expect(page.getByRole("heading", { name: "Architecture" })).toBeVisible();
    await page.getByRole("link", { name: /Next case study/ }).click();
    await expect(page).toHaveURL(/\/projects\/async-fl-bench$/);
  });

  test("command palette navigates with the keyboard", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible();
    await page.keyboard.type("bench");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects\/async-fl-bench$/);
  });
});

test.describe("interactive terminal", () => {
  test("runs commands, completes with Tab and opens projects", async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel("Terminal command");
    await expect(input).toBeAttached({ timeout: 15_000 });
    await input.fill("help");
    await input.press("Enter");
    await expect(page.getByText("open a case study")).toBeVisible();

    await input.fill("open test");
    await input.press("Tab");
    await expect(input).toHaveValue("open testforge");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/projects\/testforge$/);
  });

  test("theme command changes the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const input = page.getByLabel("Terminal command");
    await expect(input).toBeAttached({ timeout: 15_000 });
    await input.fill("theme light");
    await input.press("Enter");
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  });
});

test.describe("contact form", () => {
  test("validates fields, then sends", async ({ page }) => {
    // Never hit the real EmailJS API from tests.
    await page.route("**/api.emailjs.com/**", (r) => r.fulfill({ status: 200, body: "OK" }));
    await page.goto("/#contact");
    const form = page.locator("#contact form");
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(form.getByText("Required").first()).toBeVisible();

    await form.locator('input[name="username"]').fill("Ada Lovelace");
    await form.locator('input[name="email"]').fill("not-an-email");
    await form.locator('input[name="subject"]').fill("Backend role");
    await form.locator('textarea[name="message"]').fill("Hello!");
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(form.getByText("Enter a valid email")).toBeVisible();

    await form.locator('input[name="email"]').fill("ada@example.com");
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(form.getByRole("status")).toContainText("Thanks!");
  });
});

test.describe("blog", () => {
  test("index lists articles and posts render highlighted code + TOC", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("article, h3").filter({ hasText: /notebook to Kubernetes/i }).first()).toBeVisible();
    await page.getByRole("link", { name: /From threads to simulated time/ }).click();
    await expect(page).toHaveURL(/\/blog\/reproducible-fl-simulation$/);
    await expect(page.locator("[data-rehype-pretty-code-figure]").first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: "On this page" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Related case study/ })).toBeVisible();
  });
});
