import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/Header";

export type SortOption =
  | "az"
  | "za"
  | "lohi"
  | "hilo";

export class InventoryPage extends BasePage {
  protected readonly url = "/inventory.html";

  readonly header: Header;
  private readonly inventoryItems: Locator;
  private readonly sortDropdown: Locator;
  private readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.inventoryItems = page.locator("[data-test='inventory-item']");
    this.sortDropdown = page.locator("[data-test='product-sort-container']");
    this.title = page.locator("[data-test='title']");
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.title);
  }

  async getProductCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async getProductNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      const name = await this.inventoryItems
        .nth(i)
        .locator("[data-test='inventory-item-name']")
        .textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const prices: number[] = [];
    const count = await this.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      const priceText = await this.inventoryItems
        .nth(i)
        .locator("[data-test='inventory-item-price']")
        .textContent();
      prices.push(Number(priceText?.replace("$", "")));
    }
    return prices;
  }

  async addToCartByIndex(index: number): Promise<void> {
    await this.inventoryItems
      .nth(index)
      .locator("button[id^='add-to-cart']")
      .click();
  }

  async addToCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({
      has: this.page.locator("[data-test='inventory-item-name']", {
        hasText: productName,
      }),
    });
    await item.locator("button[id^='add-to-cart']").click();
  }

  async removeFromCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({
      has: this.page.locator("[data-test='inventory-item-name']", {
        hasText: productName,
      }),
    });
    await item.locator("button[id^='remove']").click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async openProductByName(productName: string): Promise<void> {
    await this.page
      .locator("[data-test='inventory-item-name']", { hasText: productName })
      .click();
  }
}
