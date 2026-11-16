import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";
import { epic, feature, story, severity, tags, allureId } from "allure-js-commons";

test.describe("Cart Page", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await epic("Shopping");
    await feature("Cart Page");
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.addToCartByName("Sauce Labs Bike Light");
    await inventoryPage.header.goToCart();
  });

  test("PROJ-301 | should display cart with added items", async ({ cartPage }) => {
    await allureId("PROJ-301");
    await story("Display Cart with Added Items");
    await severity("critical");
    await tags("smoke", "regression");

    const title = await cartPage.getPageTitle();
    expect(title).toBe("Your Cart");

    const count = await cartPage.cartItems.getItemCount();
    expect(count).toBe(2);
  });

  test("PROJ-302 | should proceed to checkout", async ({ cartPage, page }) => {
    await allureId("PROJ-302");
    await story("Proceed to Checkout from Cart");
    await severity("critical");
    await tags("smoke", "regression");

    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test("PROJ-303 | should display correct item names in cart", async ({ cartPage }) => {
    await allureId("PROJ-303");
    await story("Display Correct Item Names in Cart");
    await severity("normal");
    await tags("regression");

    const names = await cartPage.cartItems.getItemNames();
    expect(names).toContain("Sauce Labs Backpack");
    expect(names).toContain("Sauce Labs Bike Light");
  });

  test("PROJ-304 | should remove item from cart", async ({ cartPage }) => {
    await allureId("PROJ-304");
    await story("Remove Item from Cart");
    await severity("normal");
    await tags("regression");

    await cartPage.cartItems.removeItemByName("Sauce Labs Backpack");
    const count = await cartPage.cartItems.getItemCount();
    expect(count).toBe(1);

    const names = await cartPage.cartItems.getItemNames();
    expect(names).not.toContain("Sauce Labs Backpack");
  });

  test("PROJ-305 | should continue shopping from cart", async ({ cartPage, page }) => {
    await allureId("PROJ-305");
    await story("Continue Shopping from Cart");
    await severity("normal");
    await tags("regression");

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });

  test("PROJ-306 | should update cart badge after removal", async ({ cartPage }) => {
    await allureId("PROJ-306");
    await story("Update Cart Badge after Item Removal");
    await severity("minor");
    await tags("regression", "mock");

    expect(await cartPage.header.getCartCount()).toBe(2);
    await cartPage.cartItems.removeItemByName("Sauce Labs Backpack");
    expect(await cartPage.header.getCartCount()).toBe(1);
  });
});
