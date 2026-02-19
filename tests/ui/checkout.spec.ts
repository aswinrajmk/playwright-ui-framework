import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";
import checkoutData from "@data/test-data/checkout.json";

test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.header.goToCart();
  });

  // @sanity — core happy path
  test("should complete full checkout flow", { tag: "@sanity" }, async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutPage.fillCheckoutInfo(checkoutData.validCheckout);
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two/);

    const total = await checkoutPage.getTotalPrice();
    expect(total).toContain("Total:");

    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);

    const header = await checkoutPage.getCompleteHeader();
    expect(header).toBe("Thank you for your order!");
  });

  // @regression — navigation flows
  test("should cancel checkout and return to cart", { tag: "@regression" }, async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
  });

  test("should return to products after checkout complete", { tag: "@regression" }, async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.validCheckout);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await checkoutPage.backToHome();
    await expect(page).toHaveURL(/inventory/);
  });

  // @mock — empty field / boundary validation
  test("should show error for empty first name", { tag: "@mock" }, async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.emptyFirstName);
    await checkoutPage.continue();

    const error = await checkoutPage.getError();
    expect(error).toContain("First Name is required");
  });

  test("should show error for empty last name", { tag: "@mock" }, async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.emptyLastName);
    await checkoutPage.continue();

    const error = await checkoutPage.getError();
    expect(error).toContain("Last Name is required");
  });

  test("should show error for empty postal code", { tag: "@mock" }, async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.emptyPostalCode);
    await checkoutPage.continue();

    const error = await checkoutPage.getError();
    expect(error).toContain("Postal Code is required");
  });
});
