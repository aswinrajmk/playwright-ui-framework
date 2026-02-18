import { Page, Locator } from "@playwright/test";

export class WaitHelper {
  constructor(private readonly page: Page) {}

  async waitForUrlContains(urlPart: string, timeout = 10000): Promise<void> {
    await this.page.waitForURL(`**/*${urlPart}*`, { timeout });
  }

  async waitForNetworkIdle(timeout = 10000): Promise<void> {
    await this.page.waitForLoadState("networkidle", { timeout });
  }

  async waitForVisible(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
  }

  async waitForHidden(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: "hidden", timeout });
  }

  async waitForResponse(
    urlPattern: string | RegExp,
    timeout = 10000,
  ): Promise<void> {
    await this.page.waitForResponse(urlPattern, { timeout });
  }

  async poll(
    fn: () => Promise<boolean>,
    timeout = 10000,
    interval = 500,
  ): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await fn()) return;
      await this.page.waitForTimeout(interval);
    }
    throw new Error(`Polling timed out after ${timeout}ms`);
  }
}
