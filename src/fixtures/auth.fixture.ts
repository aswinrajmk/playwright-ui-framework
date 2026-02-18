import { test as baseTest } from "./base.fixture";
import { envConfig } from "../config/env.config";

/**
 * Auth fixture — extends base fixtures with a pre-authenticated state.
 * Tests that use `authenticatedTest` start already logged in on the inventory page.
 */
export const authenticatedTest = baseTest.extend({
  page: async ({ page }, use) => {
    // Pre-login before every test that uses this fixture
    await page.goto("/");
    await page.locator("[data-test='username']").fill(envConfig.STANDARD_USER);
    await page
      .locator("[data-test='password']")
      .fill(envConfig.STANDARD_PASSWORD);
    await page.locator("[data-test='login-button']").click();
    await page.waitForURL("**/inventory.html");

    await use(page);
  },
});

export { expect } from "@playwright/test";
