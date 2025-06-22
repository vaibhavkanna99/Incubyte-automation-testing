const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");

let TestData = require("../utils/TestData.json");
let loginPage, email, password;

test.beforeEach("set data for test", async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  email = TestData.email;
  password = TestData.password;
});

test.describe("Login Flow Negative Scenarios", () => {
  test("AUTH-LOGIN-002", async ({ page }) => {
    email = "test@email";
    await loginPage.validateLogin(email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
    );
  });

  test("AUTH-LOGIN-003", async ({ page }) => {
    email = "johndoe@gmail.com";
    password = "wrongpassword";
    await loginPage.validateLogin(email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
    );
  });

  test("AUTH-LOGIN-004", async ({ page }) => {
    email = "test2424@email.com";
    await loginPage.validateLogin(email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
    );
  });

  test("AUTH-LOGIN-005", async ({ page }) => {
    email = "";
    password = "";
    await loginPage.validateLogin(email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText("A login and a password are required.");
  });
});

test.describe("Login Flow Positive Scenarios", () => {
  test("AUTH-LOGIN-001", async ({ page }) => {
    await expect(page).toHaveURL(TestData.loginPageUrl);
    await loginPage.validateLogin(email, password);
    await expect(page).toHaveURL(TestData.homePageUrl);
  });
});
