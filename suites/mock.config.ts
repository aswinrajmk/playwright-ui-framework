/**
 * Mock Suite — Boundary & Validation tests
 *
 * Covers empty-field validation, edge cases, and destructive API operations.
 * Run manually against any environment via the mock.yml workflow dispatch.
 *
 * auth/login.spec.ts
 *   PROJ-105  should show error when username is empty
 *   PROJ-106  should show error when password is empty
 *
 * cart/cart.spec.ts
 *   PROJ-306  should update cart badge after removal
 *
 * checkout/checkout.spec.ts
 *   PROJ-404  should show error for empty first name
 *   PROJ-405  should show error for empty last name
 *   PROJ-406  should show error for empty postal code
 *
 * api/users.spec.ts
 *   PROJ-507  PATCH /posts/:id - should partially update a post
 *   PROJ-508  DELETE /posts/:id - should delete a post
 */

import { defineConfig } from "@playwright/test";
import baseConfig from "../playwright.config";

export default defineConfig({
  ...baseConfig,
  testDir: "../tests/modules",
  metadata: { suiteName: "Mock Suite" },
  testMatch: [
    "auth/login.spec.ts",
    "cart/cart.spec.ts",
    "checkout/checkout.spec.ts",
    "api/users.spec.ts",
  ],
  grep: /PROJ-105|PROJ-106|PROJ-306|PROJ-404|PROJ-405|PROJ-406|PROJ-507|PROJ-508/,
});
