/**
 * Regression Suite
 *
 * Full test coverage — all modules and all test cases.
 * Runs on scheduled builds and before releases.
 *
 * auth/login.spec.ts
 *   PROJ-101  should display login page elements
 *   PROJ-102  should login with valid credentials
 *   PROJ-103  should show error for invalid credentials
 *   PROJ-104  should show error for locked out user
 *   PROJ-105  should show error when username is empty
 *   PROJ-106  should show error when password is empty
 *
 * inventory/inventory.spec.ts
 *   PROJ-201  should display products after login
 *   PROJ-202  should add product to cart and update badge
 *   PROJ-203  should display header with logo and cart
 *   PROJ-204  should add multiple products to cart
 *   PROJ-205  should remove product from cart on inventory page
 *   PROJ-206  should sort products by name A-Z
 *   PROJ-207  should sort products by name Z-A
 *   PROJ-208  should sort products by price low to high
 *   PROJ-209  should sort products by price high to low
 *   PROJ-210  should navigate to product detail page
 *   PROJ-211  should logout successfully
 *
 * inventory/product-detail.spec.ts
 *   PROJ-212  should display product details
 *   PROJ-213  should add product to cart from detail page
 *   PROJ-214  should remove product from cart on detail page
 *   PROJ-215  should navigate back to products
 *
 * cart/cart.spec.ts
 *   PROJ-301  should display cart with added items
 *   PROJ-302  should proceed to checkout
 *   PROJ-303  should display correct item names in cart
 *   PROJ-304  should remove item from cart
 *   PROJ-305  should continue shopping from cart
 *   PROJ-306  should update cart badge after removal
 *
 * checkout/checkout.spec.ts
 *   PROJ-401  should complete full checkout flow
 *   PROJ-402  should cancel checkout and return to cart
 *   PROJ-403  should return to products after checkout complete
 *   PROJ-404  should show error for empty first name
 *   PROJ-405  should show error for empty last name
 *   PROJ-406  should show error for empty postal code
 *
 * api/users.spec.ts
 *   PROJ-501  GET /users - should return list of users
 *   PROJ-502  POST /posts - should create a new post
 *   PROJ-503  GET /users/:id - should return a single user
 *   PROJ-504  GET /posts - should return list of posts
 *   PROJ-505  GET /posts?userId=1 - should filter posts by user
 *   PROJ-506  PUT /posts/:id - should update a post
 *   PROJ-507  PATCH /posts/:id - should partially update a post
 *   PROJ-508  DELETE /posts/:id - should delete a post
 */

import { defineConfig } from "@playwright/test";
import baseConfig from "../playwright.config";

export default defineConfig({
  ...baseConfig,
  testDir: "../tests/modules",
  metadata: { suiteName: "Regression Suite" },
});
