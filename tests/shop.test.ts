import { test } from '@playwright/test';
import { Utils } from '../src/Utils';

interface Product {
    name: string;
    price: number;
    amount: number;
}

test.only('Buy products and verify prices', async ({ page }) => {
    const utils = new Utils(page);
    const products: Product[] = [
        { name: 'Stuffed Frog', price: 10.99, amount: 2 },
        { name: 'Fluffy Bunny', price: 9.99, amount: 5 },
        { name: 'Valentine Bear', price: 14.99, amount: 3 }
    ];

    await utils.goToSite();
    await utils.startShopping();
    for (const product of products) {
        await utils.addProductToCart(product.name, product.amount);
    }
    await utils.goToCart();
    await utils.validateProductTotals(products);
});