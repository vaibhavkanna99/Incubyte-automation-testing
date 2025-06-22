const { test, expect } = require("@playwright/test");
const { CreateAccountPage } = require("../page-objects/CreateAccountPage");

let TestData = require("../utils/TestData.json");
let createAccountPage, firstName, lastName, email, password, confirmPassword;

test.beforeEach("set data for test", async ({ page }) => {
  createAccountPage = new CreateAccountPage(page);
  await createAccountPage.navigateToCreateAccount();
  firstName = TestData.firstname;
  lastName = TestData.lastname;
  email = TestData.email;
  password = TestData.password;
  confirmPassword = password;
});

test.describe("Account Creation Negative Scenario", async () => {
  test("AUTH-SIGNUP-002", async ({ page }) => {
    firstName = "";
    lastName = "";
    await createAccountPage.createAccount(firstName, lastName, email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account."
    );
  });

  test("AUTH-SIGNUP-003", async ({ page }) => {
    email = "johndoe@gmail.com";
    await createAccountPage.createAccount(firstName, lastName, email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account."
    );
  });

  test.only("AUTH-SIGNUP-004", async ({ page }) => {
    email = "";
    await createAccountPage.createAccount(firstName, lastName, email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText("The customer email is missing. Enter and try again.");
  });

  test("AUTH-SIGNUP-005", async ({ page }) => {
    email = "test@email";
    await createAccountPage.createAccount(firstName, lastName, email, password);
    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "\"Email\" is not a valid hostname. 'email' does not match the expected structure for a DNS hostname 'email' looks like a local network name, which is not an acceptable format."
    );
  });

  test("AUTH-SIGNUP-006", async ({ page }) => {
    password = "Pass";
    await createAccountPage.createAccount(firstName, lastName, email, password);

    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText(
      "The password needs at least 8 characters. Create a new password and try again."
    );
  });

  test("AUTH-SIGNUP-007", async ({ page }) => {
    confirmPassword = "wrongpassword";
    await createAccountPage.createAccount(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-error"]')
    ).toHaveText("Please make sure your passwords match.");
  });
});

test.describe("Account Creation Positive Scenario", () => {
  test("AUTH-SIGNUP-001", async ({ page }) => {
    email = `test${Date.now()}@email.com`;
    await createAccountPage.createAccount(firstName, lastName, email, password);

    await expect(
      page.locator('div[role="alert"] > div[data-ui-id="message-success"]')
    ).toHaveText("Thank you for registering with Main Website Store.");
  });
});
