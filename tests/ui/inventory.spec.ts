import {
  authenticatedTest as test,
  expect,
} from "../../src/fixtures/auth.fixture";

test.describe("Inventory Page", () => {
  test("should display products after login", async ({ inventoryPage }) => {
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe("Products");

    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test("should display header with logo and cart", async ({
    inventoryPage,
  }) => {
    expect(await inventoryPage.header.isLogoVisible()).toBe(true);
    const cartCount = await inventoryPage.header.getCartCount();
    expect(cartCount).toBe(0);
  });

  test("should add product to cart and update badge", async ({
    inventoryPage,
  }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(1);
  });

  test("should add multiple products to cart", async ({
    inventoryPage,
  }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.addToCartByName("Sauce Labs Bike Light");
    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(2);
  });

  test("should remove product from cart on inventory page", async ({
    inventoryPage,
  }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.removeFromCartByName("Sauce Labs Backpack");
    expect(await inventoryPage.header.getCartCount()).toBe(0);
  });

  test("should sort products by name A-Z", async ({ inventoryPage }) => {
    await inventoryPage.sortBy("az");
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("should sort products by name Z-A", async ({ inventoryPage }) => {
    await inventoryPage.sortBy("za");
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("should sort products by price low to high", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("lohi");
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("should sort products by price high to low", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("hilo");
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test("should navigate to product detail page", async ({
    inventoryPage,
    productDetailPage,
  }) => {
    await inventoryPage.openProductByName("Sauce Labs Backpack");
    const name = await productDetailPage.getName();
    expect(name).toBe("Sauce Labs Backpack");
  });

  test("should logout successfully", async ({ inventoryPage, page }) => {
    await inventoryPage.header.logout();
    await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
  });
});
