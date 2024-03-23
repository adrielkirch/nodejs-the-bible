const safeRegex = require('safe-regex');

class InvalidRegexError extends Error {
  constructor(expression) {
    super(`This ${expression} is unsafe dude!`);
    this.name = 'InvalidRegexError';
  }
}

const evaluateRegex = (expression) => {
  const isSafe = safeRegex(expression);

  if (isSafe) {
    return expression;
  }

  throw new InvalidRegexError(expression);
}

module.exports = { evaluateRegex, InvalidRegexError };