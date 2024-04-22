const BaseError = require('./base/baseError.js');

class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({
      message: errorMessage,
      name: 'BusinessError'
    });
  }
}

module.exports = BusinessError;
