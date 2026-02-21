import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";
import { epic, feature, story, severity, tags, allureId } from "allure-js-commons";

test.describe("Inventory Page", () => {
  test.beforeEach(async () => {
    await epic("Shopping");
    await feature("Inventory Page");
  });

  test("PROJ-201 | should display products after login", async ({ inventoryPage }) => {
    await allureId("PROJ-201");
    await story("Display Products List");
    await severity("critical");
    await tags("smoke", "regression");

    const title = await inventoryPage.getPageTitle();
    expect(title).toBe("Products");

    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test("PROJ-202 | should add product to cart and update badge", async ({ inventoryPage }) => {
    await allureId("PROJ-202");
    await story("Add Product to Cart");
    await severity("critical");
    await tags("smoke", "regression");

    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(1);
  });

  test("PROJ-203 | should display header with logo and cart", async ({ inventoryPage }) => {
    await allureId("PROJ-203");
    await story("Header Display");
    await severity("normal");
    await tags("regression");

    expect(await inventoryPage.header.isLogoVisible()).toBe(true);
    const cartCount = await inventoryPage.header.getCartCount();
    expect(cartCount).toBe(0);
  });

  test("PROJ-204 | should add multiple products to cart", async ({ inventoryPage }) => {
    await allureId("PROJ-204");
    await story("Add Multiple Products to Cart");
    await severity("normal");
    await tags("regression");

    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.addToCartByName("Sauce Labs Bike Light");
    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(2);
  });

  test("PROJ-205 | should remove product from cart on inventory page", async ({ inventoryPage }) => {
    await allureId("PROJ-205");
    await story("Remove Product from Inventory Page");
    await severity("normal");
    await tags("regression");

    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.removeFromCartByName("Sauce Labs Backpack");
    expect(await inventoryPage.header.getCartCount()).toBe(0);
  });

  test("PROJ-206 | should sort products by name A-Z", async ({ inventoryPage }) => {
    await allureId("PROJ-206");
    await story("Sort Products by Name A-Z");
    await severity("normal");
    await tags("regression");

    await inventoryPage.sortBy("az");
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("PROJ-207 | should sort products by name Z-A", async ({ inventoryPage }) => {
    await allureId("PROJ-207");
    await story("Sort Products by Name Z-A");
    await severity("normal");
    await tags("regression");

    await inventoryPage.sortBy("za");
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("PROJ-208 | should sort products by price low to high", async ({ inventoryPage }) => {
    await allureId("PROJ-208");
    await story("Sort Products by Price Low to High");
    await severity("normal");
    await tags("regression");

    await inventoryPage.sortBy("lohi");
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("PROJ-209 | should sort products by price high to low", async ({ inventoryPage }) => {
    await allureId("PROJ-209");
    await story("Sort Products by Price High to Low");
    await severity("normal");
    await tags("regression");

    await inventoryPage.sortBy("hilo");
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test("PROJ-210 | should navigate to product detail page", async ({
    inventoryPage,
    productDetailPage,
  }) => {
    await allureId("PROJ-210");
    await story("Navigate to Product Detail");
    await severity("normal");
    await tags("regression");

    await inventoryPage.openProductByName("Sauce Labs Backpack");
    const name = await productDetailPage.getName();
    expect(name).toBe("Sauce Labs Backpack");
  });

  test("PROJ-211 | should logout successfully", async ({ inventoryPage, page }) => {
    await allureId("PROJ-211");
    await story("Logout");
    await severity("normal");
    await tags("regression");

    await inventoryPage.header.logout();
    await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
  });
});
