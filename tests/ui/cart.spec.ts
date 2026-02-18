import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";

test.describe("Cart Page", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    // Add items to cart before navigating
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.addToCartByName("Sauce Labs Bike Light");
    await inventoryPage.header.goToCart();
  });

  test("should display cart with added items", async ({ cartPage }) => {
    const title = await cartPage.getPageTitle();
    expect(title).toBe("Your Cart");

    const count = await cartPage.cartItems.getItemCount();
    expect(count).toBe(2);
  });

  test("should display correct item names in cart", async ({ cartPage }) => {
    const names = await cartPage.cartItems.getItemNames();
    expect(names).toContain("Sauce Labs Backpack");
    expect(names).toContain("Sauce Labs Bike Light");
  });

  test("should remove item from cart", async ({ cartPage }) => {
    await cartPage.cartItems.removeItemByName("Sauce Labs Backpack");
    const count = await cartPage.cartItems.getItemCount();
    expect(count).toBe(1);

    const names = await cartPage.cartItems.getItemNames();
    expect(names).not.toContain("Sauce Labs Backpack");
  });

  test("should continue shopping from cart", async ({ cartPage, page }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });

  test("should proceed to checkout", async ({ cartPage, page }) => {
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test("should update cart badge after removal", async ({ cartPage }) => {
    expect(await cartPage.header.getCartCount()).toBe(2);
    await cartPage.cartItems.removeItemByName("Sauce Labs Backpack");
    expect(await cartPage.header.getCartCount()).toBe(1);
  });
});
