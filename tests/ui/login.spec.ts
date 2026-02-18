import { test, expect } from "../../src/fixtures/base.fixture";
import users from "../../src/data/test-data/users.json";

test.describe("Login Page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("should display login page elements", async ({ loginPage }) => {
    expect(await loginPage.isLogoVisible()).toBe(true);
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
  });

  test("should login with valid credentials", async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(users.standardUser);
    await expect(page).toHaveURL(/inventory/);
  });

  test("should show error for invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.login(users.invalidUser);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(
      "Username and password do not match any user in this service"
    );
  });

  test("should show error for locked out user", async ({ loginPage }) => {
    await loginPage.login(users.lockedOutUser);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("locked out");
  });

  test("should show error when username is empty", async ({
    loginPage,
  }) => {
    await loginPage.login({ username: "", password: "secret_sauce" });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Username is required");
  });

  test("should show error when password is empty", async ({
    loginPage,
  }) => {
    await loginPage.login({ username: "standard_user", password: "" });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Password is required");
  });
});
