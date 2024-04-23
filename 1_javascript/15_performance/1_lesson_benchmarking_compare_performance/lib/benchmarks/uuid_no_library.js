const {randomUUID} = require('crypto');

class Cart {
    constructor() {
      this.id = randomUUID(); 
    }
}

module.exports = Cart