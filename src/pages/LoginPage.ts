import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserCredentials } from "@data/types";

export class LoginPage extends BasePage {
  protected readonly url = "/";

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("[data-test='username']");
    this.passwordInput = page.locator("[data-test='password']");
    this.loginButton = page.locator("[data-test='login-button']");
    this.errorMessage = page.locator("[data-test='error']");
    this.loginLogo = page.locator(".login_logo");
  }

  async login(credentials: UserCredentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  async isLogoVisible(): Promise<boolean> {
    return this.isVisible(this.loginLogo);
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return this.isVisible(this.loginButton);
  }
}
