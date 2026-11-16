import {
  authenticatedTest as test,
  expect,
} from "@fixtures/auth.fixture";
import { epic, feature, story, severity, tags, allureId } from "allure-js-commons";
import checkoutData from "@data/test-data/checkout.json";

test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await epic("Shopping");
    await feature("Checkout Flow");
    await inventoryPage.addToCartByName("Sauce Labs Backpack");
    await inventoryPage.header.goToCart();
  });

  test("PROJ-401 | should complete full checkout flow", async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await allureId("PROJ-401");
    await story("Complete Full Checkout Flow");
    await severity("critical");
    await tags("smoke", "regression");

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
    await allureId("PROJ-402");
    await story("Cancel Checkout and Return to Cart");
    await severity("normal");
    await tags("regression");

    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
  });

  test("PROJ-403 | should return to products after checkout complete", async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await allureId("PROJ-403");
    await story("Return to Products After Order Complete");
    await severity("normal");
    await tags("regression");

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
    await allureId("PROJ-404");
    await story("Checkout Validation - Empty First Name");
    await severity("minor");
    await tags("regression", "mock");

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
    await allureId("PROJ-405");
    await story("Checkout Validation - Empty Last Name");
    await severity("minor");
    await tags("regression", "mock");

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
    await allureId("PROJ-406");
    await story("Checkout Validation - Empty Postal Code");
    await severity("minor");
    await tags("regression", "mock");

    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.emptyPostalCode);
    await checkoutPage.continue();

    const error = await checkoutPage.getError();
    expect(error).toContain("Postal Code is required");
  });
});
