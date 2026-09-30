import { expect, test } from "@playwright/test";

const APP_TITLE = "Project Management App";

test("home page shows the app title and heading", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(APP_TITLE);
  await expect(page.getByRole("heading", { level: 1, name: APP_TITLE })).toBeVisible();
});

test("health endpoint answers 200 with status ok", async ({ request }) => {
  const response = await request.get("/api/v1/health");

  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ status: "ok" });
});
