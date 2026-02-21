import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";

test.describe("Product Detail Page", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.openProductByName("Sauce Labs Backpack");
  });

  test("PROJ-212 | should display product details", async ({ productDetailPage }) => {
    const name = await productDetailPage.getName();
    expect(name).toBe("Sauce Labs Backpack");

    const desc = await productDetailPage.getDescription();
    expect(desc.length).toBeGreaterThan(0);

    const price = await productDetailPage.getPrice();
    expect(price).toBe(29.99);
  });

  test("PROJ-213 | should add product to cart from detail page", async ({ productDetailPage }) => {
    await productDetailPage.addToCart();
    expect(await productDetailPage.isRemoveVisible()).toBe(true);
    expect(await productDetailPage.header.getCartCount()).toBe(1);
  });

  test("PROJ-214 | should remove product from cart on detail page", async ({ productDetailPage }) => {
    await productDetailPage.addToCart();
    await productDetailPage.removeFromCart();
    expect(await productDetailPage.isAddToCartVisible()).toBe(true);
    expect(await productDetailPage.header.getCartCount()).toBe(0);
  });

  test("PROJ-215 | should navigate back to products", async ({ productDetailPage, page }) => {
    await productDetailPage.goBack();
    await expect(page).toHaveURL(/inventory/);
  });
});
