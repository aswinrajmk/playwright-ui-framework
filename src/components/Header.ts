import { Page, Locator } from "@playwright/test";

export class Header {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly appLogo: Locator;
  private readonly menuCloseButton: Locator;
  private readonly resetAppStateLink: Locator;

  constructor(private readonly page: Page) {
    this.cartBadge = page.locator("[data-test='shopping-cart-badge']");
    this.cartLink = page.locator("[data-test='shopping-cart-link']");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator("[data-test='logout-sidebar-link']");
    this.appLogo = page.locator(".app_logo");
    this.menuCloseButton = page.getByRole("button", { name: "Close Menu" });
    this.resetAppStateLink = page.locator(
      "[data-test='reset-sidebar-link']"
    );
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return Number(text);
    }
    return 0;
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.waitFor({ state: "visible" });
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.waitFor({ state: "visible" });
    await this.resetAppStateLink.click();
    await this.menuCloseButton.click();
  }

  async isLogoVisible(): Promise<boolean> {
    return this.appLogo.isVisible();
  }
}
