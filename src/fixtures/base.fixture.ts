import { test as base } from "@playwright/test";
import { parentSuite, suite, subSuite } from "allure-js-commons";
import { LoginPage } from "@pages/LoginPage";
import { InventoryPage } from "@pages/InventoryPage";
import { CartPage } from "@pages/CartPage";
import { CheckoutPage } from "@pages/CheckoutPage";
import { ProductDetailPage } from "@pages/ProductDetailPage";
import { WaitHelper } from "@utils/WaitHelper";

type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productDetailPage: ProductDetailPage;
  waitHelper: WaitHelper;
  _allureLabels: void;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  waitHelper: async ({ page }, use) => {
    await use(new WaitHelper(page));
  },

  _allureLabels: [
    async ({}, use, testInfo) => {
      const meta = testInfo.config.metadata as { suiteName?: string };
      const suiteName = meta.suiteName ?? "Tests";
      const subSuiteName =
        testInfo.titlePath.length > 1 ? testInfo.titlePath[0] : "";

      await parentSuite(suiteName);
      await suite("UI");
      if (subSuiteName) await subSuite(subSuiteName);

      await use();
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
