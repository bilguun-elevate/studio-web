import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads without errors", async ({ page }) => {
    await expect(page).toHaveTitle(/Elevate Studio/);
  });

  test("nav: menu opens and closes (desktop toggle)", async ({ page, viewport }) => {
    // On mobile the full-screen overlay covers the toggle button — use close button instead (tested separately)
    test.skip((viewport?.width ?? 1280) < 768, "desktop only");

    const menuBtn = page.locator(".menu-btn");
    await menuBtn.click();
    await expect(page.locator(".menu-overlay.open")).toBeVisible();
    // Click toggle button again to close (desktop: button is above overlay)
    await menuBtn.click();
    await expect(page.locator(".menu-overlay.open")).not.toBeVisible();
  });

  test("nav: menu links are present", async ({ page }) => {
    const menuBtn = page.locator(".menu-btn");
    await menuBtn.click();

    const overlay = page.locator(".menu-overlay.open");
    await expect(overlay).toBeVisible();

    // All nav links should be in the overlay
    for (const label of ["Бүтээлүүд", "Үйлчилгээ", "Үнэ"]) {
      await expect(overlay.getByText(label)).toBeVisible();
    }
  });

  test("nav: menu closes on link click", async ({ page }) => {
    const menuBtn = page.locator(".menu-btn");
    await menuBtn.click();
    await expect(page.locator(".menu-overlay.open")).toBeVisible();

    // Click a menu link
    await page.locator(".menu-nav-link").first().click();
    await expect(page.locator(".menu-overlay.open")).not.toBeVisible();
  });

  test("project cards link to correct case study pages", async ({ page }) => {
    const slugs = ["prohost-ai", "atlas", "iron-health", "lanndy"];
    for (const slug of slugs) {
      const link = page.locator(`a[href="/projects/${slug}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test("hero CTA button is present", async ({ page }) => {
    // Cal.com booking link in hero
    const cta = page.locator(`a[href*="cal.com"]`).first();
    await expect(cta).toBeVisible();
  });
});

test.describe("Homepage — mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu opens full-screen on mobile", async ({ page }) => {
    await page.goto("/");
    const menuBtn = page.locator(".menu-btn");
    await menuBtn.click();

    const overlay = page.locator(".menu-overlay.open");
    await expect(overlay).toBeVisible();

    // On mobile the overlay should fill the viewport
    const box = await overlay.boundingBox();
    expect(box?.width).toBeGreaterThan(380);
    expect(box?.height).toBeGreaterThan(800);
  });

  test("close button visible on mobile", async ({ page }) => {
    await page.goto("/");
    await page.locator(".menu-btn").click();
    // The dedicated close button (X) inside the overlay
    const closeBtn = page.locator(".menu-close-btn");
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(page.locator(".menu-overlay.open")).not.toBeVisible();
  });
});
