const database = require("../database");
const Cart = require("./entities/cart");

const cart = new Cart(database);
console.log(cart)