import { test, expect } from "@fixtures/base.fixture";
import { epic, feature, story, severity, tags, allureId } from "allure-js-commons";
import users from "@data/test-data/users.json";

test.describe("Login Page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await epic("Authentication");
    await feature("Login Page");
    await loginPage.navigate();
  });

  test("PROJ-101 | should display login page elements", async ({ loginPage }) => {
    await allureId("PROJ-101");
    await story("Display Login Page Elements");
    await severity("normal");
    await tags("smoke", "regression");

    expect(await loginPage.isLogoVisible()).toBe(true);
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
  });

  test("PROJ-102 | should login with valid credentials", async ({ loginPage, page }) => {
    await allureId("PROJ-102");
    await story("Login with Valid Credentials");
    await severity("critical");
    await tags("smoke", "regression");

    await loginPage.login(users.standardUser);
    await expect(page).toHaveURL(/inventory/);
  });

  test("PROJ-103 | should show error for invalid credentials", async ({ loginPage }) => {
    await allureId("PROJ-103");
    await story("Login Error - Invalid Credentials");
    await severity("normal");
    await tags("regression");

    await loginPage.login(users.invalidUser);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(
      "Username and password do not match any user in this service",
    );
  });

  test("PROJ-104 | should show error for locked out user", async ({ loginPage }) => {
    await allureId("PROJ-104");
    await story("Login Error - Locked Out User");
    await severity("normal");
    await tags("regression");

    await loginPage.login(users.lockedOutUser);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("locked out");
  });

  test("PROJ-105 | should show error when username is empty", async ({ loginPage }) => {
    await allureId("PROJ-105");
    await story("Login Validation - Empty Username");
    await severity("minor");
    await tags("regression", "mock");

    await loginPage.login({ username: "", password: "secret_sauce" });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Username is required");
  });

  test("PROJ-106 | should show error when password is empty", async ({ loginPage }) => {
    await allureId("PROJ-106");
    await story("Login Validation - Empty Password");
    await severity("minor");
    await tags("regression", "mock");

    await loginPage.login({ username: "standard_user", password: "" });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Password is required");
  });
});
