import { test, expect } from "@fixtures/base.fixture";
import users from "@data/test-data/users.json";

test.describe("Login Page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("PROJ-101 | should display login page elements", async ({ loginPage }) => {
    expect(await loginPage.isLogoVisible()).toBe(true);
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
  });

  test("PROJ-102 | should login with valid credentials", async ({ loginPage, page }) => {
    await loginPage.login(users.standardUser);
    await expect(page).toHaveURL(/inventory/);
  });

  test("PROJ-103 | should show error for invalid credentials", async ({ loginPage }) => {
    await loginPage.login(users.invalidUser);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(
      "Username and password do not match any user in this service",
    );
  });

  test("PROJ-104 | should show error for locked out user", async ({ loginPage }) => {
    await loginPage.login(users.lockedOutUser);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("locked out");
  });

  test("PROJ-105 | should show error when username is empty", async ({ loginPage }) => {
    await loginPage.login({ username: "", password: "secret_sauce" });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Username is required");
  });

  test("PROJ-106 | should show error when password is empty", async ({ loginPage }) => {
    await loginPage.login({ username: "standard_user", password: "" });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Password is required");
  });
});
