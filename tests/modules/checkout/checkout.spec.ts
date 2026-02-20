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

  test("PROJ-401 | should complete full checkout flow", async ({
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

  test("PROJ-402 | should cancel checkout and return to cart", async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
  });

  test("PROJ-403 | should return to products after checkout complete", async ({
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

  test("PROJ-404 | should show error for empty first name", async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.emptyFirstName);
    await checkoutPage.continue();

    const error = await checkoutPage.getError();
    expect(error).toContain("First Name is required");
  });

  test("PROJ-405 | should show error for empty last name", async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.emptyLastName);
    await checkoutPage.continue();

    const error = await checkoutPage.getError();
    expect(error).toContain("Last Name is required");
  });

  test("PROJ-406 | should show error for empty postal code", async ({
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
