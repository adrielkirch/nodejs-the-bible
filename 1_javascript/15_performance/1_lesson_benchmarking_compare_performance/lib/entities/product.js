class Product {
  constructor({ description, name, price, tmpProperty, activePromoId }) {
    this.description = description;
    this.name = name;
    this.price = price;
    this.tmpProperty = tmpProperty;
    this.activePromoId = activePromoId ?? 0;
  }
}

module.exports = {
  Product,
};
