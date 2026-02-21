import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";

test.describe("Cart Page", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.addToCartByName("Sauce Labs Bike Light");
    await inventoryPage.header.goToCart();
  });

  test("PROJ-301 | should display cart with added items", async ({ cartPage }) => {
    const title = await cartPage.getPageTitle();
    expect(title).toBe("Your Cart");

    const count = await cartPage.cartItems.getItemCount();
    expect(count).toBe(2);
  });

  test("PROJ-302 | should proceed to checkout", async ({ cartPage, page }) => {
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test("PROJ-303 | should display correct item names in cart", async ({ cartPage }) => {
    const names = await cartPage.cartItems.getItemNames();
    expect(names).toContain("Sauce Labs Backpack");
    expect(names).toContain("Sauce Labs Bike Light");
  });

  test("PROJ-304 | should remove item from cart", async ({ cartPage }) => {
    await cartPage.cartItems.removeItemByName("Sauce Labs Backpack");
    const count = await cartPage.cartItems.getItemCount();
    expect(count).toBe(1);

    const names = await cartPage.cartItems.getItemNames();
    expect(names).not.toContain("Sauce Labs Backpack");
  });

  test("PROJ-305 | should continue shopping from cart", async ({ cartPage, page }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });

  test("PROJ-306 | should update cart badge after removal", async ({ cartPage }) => {
    expect(await cartPage.header.getCartCount()).toBe(2);
    await cartPage.cartItems.removeItemByName("Sauce Labs Backpack");
    expect(await cartPage.header.getCartCount()).toBe(1);
  });
});
