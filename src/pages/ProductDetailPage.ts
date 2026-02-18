import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/Header";

export class ProductDetailPage extends BasePage {
  protected readonly url = "/inventory-item.html";

  readonly header: Header;
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.productName = page.locator("[data-test='inventory-item-name']");
    this.productDescription = page.locator(
      "[data-test='inventory-item-desc']"
    );
    this.productPrice = page.locator("[data-test='inventory-item-price']");
    this.addToCartButton = page.locator("button[id^='add-to-cart']");
    this.removeButton = page.locator("button[id^='remove']");
    this.backButton = page.locator("[data-test='back-to-products']");
  }

  async getName(): Promise<string> {
    return this.getText(this.productName);
  }

  async getDescription(): Promise<string> {
    return this.getText(this.productDescription);
  }

  async getPrice(): Promise<number> {
    const priceText = await this.getText(this.productPrice);
    return Number(priceText.replace("$", ""));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton);
  }

  async isRemoveVisible(): Promise<boolean> {
    return this.isVisible(this.removeButton);
  }
}
