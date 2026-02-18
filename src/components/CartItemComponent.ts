import { Page, Locator } from "@playwright/test";

export class CartItemComponent {
  private readonly items: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator("[data-test='inventory-item']");
  }

  async getItemCount(): Promise<number> {
    return this.items.count();
  }

  async getItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.items.count();
    for (let i = 0; i < count; i++) {
      const name = await this.items
        .nth(i)
        .locator("[data-test='inventory-item-name']")
        .textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async getItemPrice(index: number): Promise<number> {
    const priceText = await this.items
      .nth(index)
      .locator("[data-test='inventory-item-price']")
      .textContent();
    return Number(priceText?.replace("$", ""));
  }

  async removeItem(index: number): Promise<void> {
    await this.items.nth(index).getByRole("button", { name: "Remove" }).click();
  }

  async removeItemByName(name: string): Promise<void> {
    const item = this.items.filter({
      has: this.page.locator("[data-test='inventory-item-name']", {
        hasText: name,
      }),
    });
    await item.getByRole("button", { name: "Remove" }).click();
  }
}
