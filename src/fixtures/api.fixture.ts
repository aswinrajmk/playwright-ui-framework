import { test as base, expect } from "@playwright/test";
import { ApiClient } from "@api/ApiClient";
import { UserApi } from "@api/endpoints/UserApi";
import { envConfig } from "@config/env.config";

type ApiFixtures = {
  apiClient: ApiClient;
  userApi: UserApi;
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
});

export { expect };
