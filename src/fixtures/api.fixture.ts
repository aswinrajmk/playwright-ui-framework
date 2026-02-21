import { test as base, expect } from "@playwright/test";
import { parentSuite, suite, subSuite } from "allure-js-commons";
import { ApiClient } from "@api/ApiClient";
import { UserApi } from "@api/endpoints/UserApi";
import { envConfig } from "@config/env.config";

type ApiFixtures = {
  apiClient: ApiClient;
  userApi: UserApi;
  _allureLabels: void;
};

export const apiTest = base.extend<ApiFixtures>({
  apiClient: async ({ playwright }, use) => {
    const requestContext = await playwright.request.newContext({
      baseURL: envConfig.API_BASE_URL.endsWith("/")
        ? envConfig.API_BASE_URL
        : `${envConfig.API_BASE_URL}/`,
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const client = new ApiClient(requestContext);
    await use(client);
    await requestContext.dispose();
  },

  userApi: async ({ apiClient }, use) => {
    await use(new UserApi(apiClient));
  },

  _allureLabels: [
    async ({}, use, testInfo) => {
      const meta = testInfo.config.metadata as { suiteName?: string };
      const suiteName = meta.suiteName ?? "Tests";
      const subSuiteName =
        testInfo.titlePath.length > 1 ? testInfo.titlePath[0] : "";

      await parentSuite(suiteName);
      await suite("API");
      if (subSuiteName) await subSuite(subSuiteName);

      await use();
    },
    { auto: true },
  ],
});

export { expect };
