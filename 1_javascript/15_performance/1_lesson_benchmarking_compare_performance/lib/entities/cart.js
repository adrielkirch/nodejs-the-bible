const { Product } = require("./product");
const { randomUUID } = require("crypto");//npm i benchmark, to mesuare performance

class Cart {
  constructor({ at, products }) {
    this.id = randomUUID(); // O(1)

    // removeUndefinedProps function call
    this.products = this.removeUndefinedProps(products); // O(N)

    // getCartPrice function call
    this.total = this.getCartPrice(); // O(N)
  }

  // removeUndefinedProps function definition
  removeUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => Reflect.ownKeys(product).length) // O(N), where N is the total of products
      .map((product) => new Product(product)); // O(N), where N is the total of products

      return JSON.parse(JSON.stringify(new Product(productsEntities)));  // O(N)O(N)
  }

  // getCartPrice function definition O(N)O(N
  getCartPrice() {
    return this.products
      .map((product) => product.price) // O(N)
      .reduce((prev, next) => prev + next, 0); // O(N)
  }
}

module.exports = Cart;
