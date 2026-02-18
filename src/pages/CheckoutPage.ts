import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "@components/Header";
import { CheckoutInfo } from "@data/types";

export class CheckoutPage extends BasePage {
  protected readonly url = "/checkout-step-one.html";

  readonly header: Header;

  // Step One
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  // Step Two (Overview)
  private readonly finishButton: Locator;
  private readonly summaryTotal: Locator;
  private readonly summarySubtotal: Locator;
  private readonly summaryTax: Locator;

  // Complete
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;

  private readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    // Step One
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.postalCodeInput = page.locator("[data-test='postalCode']");
    this.continueButton = page.locator("[data-test='continue']");
    this.cancelButton = page.locator("[data-test='cancel']");
    this.errorMessage = page.locator("[data-test='error']");

    // Step Two
    this.finishButton = page.locator("[data-test='finish']");
    this.summaryTotal = page.locator("[data-test='total-label']");
    this.summarySubtotal = page.locator("[data-test='subtotal-label']");
    this.summaryTax = page.locator("[data-test='tax-label']");

    // Complete
    this.completeHeader = page.locator("[data-test='complete-header']");
    this.completeText = page.locator("[data-test='complete-text']");
    this.backHomeButton = page.locator("[data-test='back-to-products']");

    this.title = page.locator("[data-test='title']");
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.title);
  }

  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getError(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async getTotalPrice(): Promise<string> {
    return this.getText(this.summaryTotal);
  }

  async getSubtotal(): Promise<string> {
    return this.getText(this.summarySubtotal);
  }

  async getTax(): Promise<string> {
    return this.getText(this.summaryTax);
  }

  async getCompleteHeader(): Promise<string> {
    return this.getText(this.completeHeader);
  }

  async getCompleteText(): Promise<string> {
    return this.getText(this.completeText);
  }

  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
