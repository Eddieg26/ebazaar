const fs = require('fs');
const productController = require('../controllers/product.controller');

function loadProducts() {
    const data = fs.readFileSync('./assets/products.json', 'utf8');
    let products = JSON.parse(data);

    return products;
}

function createProducts(products) {
    return productController.createMany(products);
}

async function run() {
    console.log('loading products');

    const products = loadProducts();
    await createProducts(products);

    console.log('done!');
}

module.exports = { run };

