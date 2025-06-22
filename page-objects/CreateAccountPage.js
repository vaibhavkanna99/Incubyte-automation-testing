const { test, expect } = require("@playwright/test");
class CreateAccountPage {
  constructor(page) {
    this.page = page;
    this.createButton = page.locator('button[title="Create an Account"]');
    this.firstName = page.locator("#firstname");
    this.lastName = page.locator("#lastname");
    this.email = page.locator("#email_address");
    this.password = page.locator("#password");
    this.confirmPassword = page.locator("#password-confirmation");
  }

  async navigateToCreateAccount() {
    await this.page.goto("https://magento.softwaretestingboard.com/", {
      waitUntil: "domcontentloaded",
    });
    const createAcctButton = await this.page.getByRole("link", {
      name: "Create an Account",
    });
    await createAcctButton.click();
    // await expect(
    //   page.getByRole("link", { name: "Create an Account" })
    // ).toBeVisible();
    // await page.getByRole("link", { name: "Create an Account" }).click();

    ///html/body/div[2]/header/div[1]/div/ul/a
  }

  async createAccount(
    firstName,
    lastName,
    email,
    password,
    confirmPassword = password
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
    await this.createButton.click();
  }
}

module.exports = { CreateAccountPage };
