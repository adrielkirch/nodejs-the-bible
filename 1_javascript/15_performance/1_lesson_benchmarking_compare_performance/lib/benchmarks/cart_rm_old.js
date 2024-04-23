const { Product } = require("../entities/product");

class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length) // se for 0 => !!0 == false || !!1 == true
      .map((product) => new Product(product));

    return JSON.parse(JSON.stringify(productsEntities));
  }
}

module.exports = Cart;
