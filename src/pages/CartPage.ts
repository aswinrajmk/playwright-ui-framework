import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/Header";
import { CartItemComponent } from "../components/CartItemComponent";

export class CartPage extends BasePage {
  protected readonly url = "/cart.html";

  readonly header: Header;
  readonly cartItems: CartItemComponent;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.cartItems = new CartItemComponent(page);
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.continueShoppingButton = page.locator(
      "[data-test='continue-shopping']"
    );
    this.title = page.locator("[data-test='title']");
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.title);
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
