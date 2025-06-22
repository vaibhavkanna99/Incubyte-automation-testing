class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("#send2");
    this.email = page.locator("#email");
    this.password = page.locator("#pass");
  }

  async navigateToLogin() {
    await this.page.goto("https://magento.softwaretestingboard.com/", {
      waitUntil: "domcontentloaded",
    });
    const loginButton = await this.page.locator(".authorization-link").first();
    await loginButton.click();
  }

  async validateLogin(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}
module.exports = { LoginPage };
