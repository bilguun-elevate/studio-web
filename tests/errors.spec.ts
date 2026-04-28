import { test, expect } from "@playwright/test";

test.describe("Error pages", () => {
  test("404 — custom not-found page renders", async ({ page }) => {
    await page.goto("/nonexistent-page-xyz");
    // h1 contains "Хуудас" (may have <br /> splitting the text)
    await expect(page.locator("h1")).toContainText("Хуудас");
    // Back to home CTA present
    await expect(page.getByText("Нүүр хуудас руу буцах")).toBeVisible();
  });

  test("404 — unknown project slug shows not-found", async ({ page }) => {
    await page.goto("/projects/nonexistent-project");
    await expect(page.locator("h1")).toContainText("Хуудас");
  });
});

test.describe("SEO infrastructure", () => {
  test("sitemap.xml returns valid XML", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain("elevatestudio.xyz");
    expect(content).toContain("/projects/prohost-ai");
  });

  test("robots.txt disallows /keystatic", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const content = await page.textContent("body") ?? await response?.text() ?? "";
    expect(content).toContain("Disallow: /keystatic");
    expect(content).toContain("sitemap.xml");
  });
});
