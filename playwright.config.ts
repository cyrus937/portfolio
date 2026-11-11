import { defineConfig, devices } from "@playwright/test";

// Locally you can reuse an installed Chrome: CHROME_PATH=/usr/bin/google-chrome npm test
const chrome = process.env.CHROME_PATH;
const launchOptions = chrome ? { executablePath: chrome } : {};

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:4175",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], launchOptions }, testIgnore: /mobile\.spec/ },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions }, testMatch: /mobile\.spec/ },
  ],
  // Serves the pre-rendered build exactly like a static host (no SPA fallback).
  webServer: {
    command: "npx sirv dist --port 4175 --host 127.0.0.1",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: !process.env.CI,
  },
});
