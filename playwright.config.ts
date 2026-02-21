import { defineConfig, devices } from "@playwright/test";
import { envConfig } from "./src/config/env.config";

export default defineConfig({
  testDir: "./tests/modules",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : envConfig.RETRIES,
  workers: process.env.CI ? 2 : envConfig.WORKERS,
  timeout: envConfig.TIMEOUT,

  reporter: [
    ["list"],
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: true,
      },
    ],
  ],

  use: {
    baseURL: envConfig.BASE_URL,
    trace: envConfig.TRACE_ON_FAILURE ? "retain-on-failure" : "off",
    screenshot: envConfig.SCREENSHOT_ON_FAILURE ? "only-on-failure" : "off",
    video: envConfig.VIDEO_ON_FAILURE ? "retain-on-failure" : "off",
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "mobile-chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "mobile-safari",
    //   use: { ...devices["iPhone 12"] },
    // },
    {
      name: "api",
      testDir: "./tests/modules/api",
      use: {
        baseURL: envConfig.API_BASE_URL,
      },
    },
  ],
});
