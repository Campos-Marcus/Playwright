class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }


    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        const loginError = this.page.getByText('Incorrect email or password.', { exact: false });
        const firstProduct = this.page.locator('.card-body').first();
        await firstProduct.or(loginError).first().waitFor({ state: 'visible' });
        if (await loginError.isVisible()) {
            throw new Error('Login failed: Incorrect email or password. Update the credentials supplied to this scenario.');
        }
        await firstProduct.waitFor({ state: 'visible' });
    }
}

module.exports = { LoginPage };
