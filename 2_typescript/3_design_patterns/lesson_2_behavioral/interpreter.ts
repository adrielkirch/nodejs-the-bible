/**
 * **Interpreter**
 *
 * > "Given a language, define a representation for its grammar along with an
 * interpreter that uses the representation to interpret sentences in the language."
 *
 * Perhaps on of the odder birds in Design Patterns. Certainly
 * not something I have been using a lot, if that matters.
 *
 * This pattern is meant to be used for cases where relatively simple
 * language terms should be evaluated as expressions. It does not
 * replace things like regular expressions, but is rather meant
 * as a possibility when constructing, for example, domain specific languages.
 *
 * In my reading and studying the Design Patterns book, this one
 * has been one of the more interesting ones, maybe because it seems
 * relatively unmentioned. For more exercise, ask ChatGPT for examples
 * that involve a DSL use case!
 *
 * We'll look at a basic math (arithmetic) processor here.
 *
 * @see https://en.wikipedia.org/wiki/Interpreter_pattern
 * @see Page 243 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function interpreterDemo() {
  // Globally known to the interpreter
  class Context {
    private variables: { [key: string]: number } = {};

    setVariable(name: string, value: number) {
      this.variables[name] = value;
    }

    getVariable(name: string) {
      return this.variables[name];
    }
  }

  // The abstraction all expressions have in common
  abstract class Expression {
    abstract interpret(context: Context): number;
  }

  // "Terminal expression" for numbers
  class NumberExpression extends Expression {
    constructor(private value: number) {
      super();
    }

    interpret() {
      return this.value;
    }
  }

  // "Non-terminal expression" for addition
  class AddExpression extends Expression {
    constructor(private left: Expression, private right: Expression) {
      super();
    }

    interpret(context: Context) {
      return this.left.interpret(context) + this.right.interpret(context);
    }
  }

  // "Non-terminal expression" for subtraction
  class SubtractExpression extends Expression {
    constructor(private left: Expression, private right: Expression) {
      super();
    }

    interpret(context: Context) {
      return this.left.interpret(context) - this.right.interpret(context);
    }
  }

  // Let's interpret some expressions
  const context = new Context();
  context.setVariable('a', 10);
  context.setVariable('b', 5);

  const expression = new SubtractExpression(
    // 10 + 7...
    new AddExpression(
      new NumberExpression(context.getVariable('a')),
      new NumberExpression(7)
    ),
    // ... -5
    new NumberExpression(context.getVariable('b'))
  );

  const result = expression.interpret(context);
  console.log(`Result: ${result}`);
}

interpreterDemo();
