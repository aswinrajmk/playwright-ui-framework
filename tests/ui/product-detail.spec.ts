import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";

test.describe("Product Detail Page", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.openProductByName("Sauce Labs Backpack");
  });

  // @sanity — core product detail view
  test("should display product details", { tag: "@sanity" }, async ({ productDetailPage }) => {
    const name = await productDetailPage.getName();
    expect(name).toBe("Sauce Labs Backpack");

    const desc = await productDetailPage.getDescription();
    expect(desc.length).toBeGreaterThan(0);

    const price = await productDetailPage.getPrice();
    expect(price).toBe(29.99);
  });

  // @regression — cart interactions from detail page
  test("should add product to cart from detail page", { tag: "@regression" }, async ({
    productDetailPage,
  }) => {
    await productDetailPage.addToCart();
    expect(await productDetailPage.isRemoveVisible()).toBe(true);
    expect(await productDetailPage.header.getCartCount()).toBe(1);
  });

  test("should remove product from cart on detail page", { tag: "@regression" }, async ({
    productDetailPage,
  }) => {
    await productDetailPage.addToCart();
    await productDetailPage.removeFromCart();
    expect(await productDetailPage.isAddToCartVisible()).toBe(true);
    expect(await productDetailPage.header.getCartCount()).toBe(0);
  });

  test("should navigate back to products", { tag: "@regression" }, async ({
    productDetailPage,
    page,
  }) => {
    await productDetailPage.goBack();
    await expect(page).toHaveURL(/inventory/);
  });
});
