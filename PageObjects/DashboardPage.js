class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='car']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName) {
        await this.productsText.first().waitFor({ state: 'visible' });
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const title = await this.products.nth(i).locator("b").textContent();
            if (title.trim().toLowerCase() === productName.trim().toLowerCase()) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                return;
            }
        }
        throw new Error(`Product not found: ${productName}`);
    }

    async navigateToCart() {
        await this.cart.click();
    }

    async navigateToOrders() {
        await this.orders.click();
    }
}

module.exports = { DashboardPage };
