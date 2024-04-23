const { v4: uuidv4 } = require("uuid");

class Cart {
    constructor() {
      this.id = uuidv4(); 
    }
}

module.exports = Cart