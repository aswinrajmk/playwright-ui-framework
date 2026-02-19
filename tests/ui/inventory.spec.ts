import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";

test.describe("Inventory Page", () => {
  // @sanity — core happy path
  test("should display products after login", { tag: "@sanity" }, async ({ inventoryPage }) => {
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe("Products");

    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test("should add product to cart and update badge", { tag: "@sanity" }, async ({
    inventoryPage,
  }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(1);
  });

  // @regression — extended coverage
  test("should display header with logo and cart", { tag: "@regression" }, async ({
    inventoryPage,
  }) => {
    expect(await inventoryPage.header.isLogoVisible()).toBe(true);
    const cartCount = await inventoryPage.header.getCartCount();
    expect(cartCount).toBe(0);
  });

  test("should add multiple products to cart", { tag: "@regression" }, async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.addToCartByName("Sauce Labs Bike Light");
    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(2);
  });

  test("should remove product from cart on inventory page", { tag: "@regression" }, async ({
    inventoryPage,
  }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.removeFromCartByName("Sauce Labs Backpack");
    expect(await inventoryPage.header.getCartCount()).toBe(0);
  });

  test("should sort products by name A-Z", { tag: "@regression" }, async ({ inventoryPage }) => {
    await inventoryPage.sortBy("az");
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("should sort products by name Z-A", { tag: "@regression" }, async ({ inventoryPage }) => {
    await inventoryPage.sortBy("za");
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("should sort products by price low to high", { tag: "@regression" }, async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("lohi");
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("should sort products by price high to low", { tag: "@regression" }, async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("hilo");
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test("should navigate to product detail page", { tag: "@regression" }, async ({
    inventoryPage,
    productDetailPage,
  }) => {
    await inventoryPage.openProductByName("Sauce Labs Backpack");
    const name = await productDetailPage.getName();
    expect(name).toBe("Sauce Labs Backpack");
  });

  test("should logout successfully", { tag: "@regression" }, async ({ inventoryPage, page }) => {
    await inventoryPage.header.logout();
    await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
  });
});
