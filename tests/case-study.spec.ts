import { test, expect } from "@playwright/test";

const projects = [
  { slug: "prohost-ai", name: "ProhostAI" },
  { slug: "atlas", name: "Atlas" },
  { slug: "iron-health", name: "Iron" },
  { slug: "lanndy", name: "Lanndy" },
];

test.describe("Case study pages", () => {
  for (const { slug, name } of projects) {
    test(`/projects/${slug} loads`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      // Page title should contain the project name
      await expect(page).toHaveTitle(new RegExp(name, "i"));
      // Back link present
      await expect(page.locator('a[href="/#projects"]').first()).toBeVisible();
    });

    test(`/projects/${slug} has nav`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await expect(page.locator("nav")).toBeVisible();
    });
  }

  test("ProhostAI media grid renders images", async ({ page }) => {
    await page.goto("/projects/prohost-ai");
    const mediaGrid = page.locator(".cs-media-grid");
    await expect(mediaGrid).toBeVisible();
    const images = mediaGrid.locator("img");
    await expect(images.first()).toBeVisible();
  });

  test("Lanndy shows upcoming page (not media grid)", async ({ page }) => {
    await page.goto("/projects/lanndy");
    // Should show "Бэлтгэлийн шатанд" label
    await expect(page.getByText("Бэлтгэлийн шатанд")).toBeVisible();
    // Should NOT show a media grid
    await expect(page.locator(".cs-media-grid")).not.toBeVisible();
  });
});
