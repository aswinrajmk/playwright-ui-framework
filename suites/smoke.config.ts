/**
 * Smoke Suite
 *
 * Core happy-path tests that must pass on every build.
 * Add or remove entries here to control what is in scope for smoke.
 *
 * PROJ-101  Login > should display login page elements
 * PROJ-102  Login > should login with valid credentials
 * PROJ-201  Inventory > should display products after login
 * PROJ-202  Inventory > should add product to cart and update badge
 * PROJ-301  Cart > should display cart with added items
 * PROJ-302  Cart > should proceed to checkout
 * PROJ-401  Checkout > should complete full checkout flow
 * PROJ-501  API > GET /users - should return list of users
 * PROJ-502  API > POST /posts - should create a new post
 */

import { defineConfig } from "@playwright/test";
import baseConfig from "../playwright.config";

export default defineConfig({
  ...baseConfig,
  testDir: "../tests/modules",
  metadata: { suiteName: "Smoke Suite" },
  testMatch: [
    "auth/login.spec.ts",
    "inventory/inventory.spec.ts",
    "cart/cart.spec.ts",
    "checkout/checkout.spec.ts",
    "api/users.spec.ts",
  ],
  grep: /PROJ-101|PROJ-102|PROJ-201|PROJ-202|PROJ-301|PROJ-302|PROJ-401|PROJ-501|PROJ-502/,
});
