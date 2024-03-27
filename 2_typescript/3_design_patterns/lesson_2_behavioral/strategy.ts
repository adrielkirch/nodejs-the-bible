/**
 * **Strategy**
 *
 * > "Define a family of algorithms, encapsulate each one, and make them
 * interchangeable. Strategy lets the algorithm vary independently from clients
 * that use it."
 *
 * Strategy is a super neat pattern that lets you switch out implementations in
 * runtime without having to change the code that uses it. It's good for most
 * non-trivial use cases where you'd otherwise end up with bloated logic and
 * if/else hellscapes. In fact, as an effect of the pattern, there should be no
 * (or minimal) conditional statements left, as they aren't needed for handling
 * behavior.
 *
 * Obviously, to use Strategy, your classes should differ only in behavior.
 *
 * Because it's closely related to dependency injection, you get all the same
 * benefits, like better composed code, easier testing, and more predictable behavior.
 *
 * The example will use a case that makes a lot of sense for a Strategy:
 * picking the appropriate payment "strategy"/implementation.
 *
 * @see https://refactoring.guru/design-patterns/strategy
 * @see https://en.wikipedia.org/wiki/Strategy_pattern
 */
function strategyDemo() {
  interface PaymentStrategy {
    pay(amount: number): void;
  }

  // Concrete Strategy implementations
  class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string, private name: string) {
      //
    }

    pay(amount: number) {
      const lastFourDigits = this.cardNumber.slice(-4);
      console.log(
        `Paid $${amount} with Credit Card (**** **** **** ${lastFourDigits}, ${this.name})`
      );
    }
  }

  class StripePayment implements PaymentStrategy {
    constructor(private email: string) {
      //
    }

    pay(amount: number) {
      console.log(`Paid $${amount} with Stripe (${this.email})`);
    }
  }

  // Context - what the user will interact with
  class PaymentProcessor {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
      this.paymentStrategy = paymentStrategy;
    }

    setPaymentStrategy(paymentStrategy: PaymentStrategy) {
      this.paymentStrategy = paymentStrategy;
    }

    processPayment(amount: number) {
      this.paymentStrategy.pay(amount);
    }
  }

  // Setup
  const creditCardPayment: PaymentStrategy = new CreditCardPayment(
    '1234 5678 9012 3456',
    'John Doe'
  );
  const stripePayment: PaymentStrategy = new StripePayment(
    'john.doe@example.com'
  );

  const paymentProcessor: PaymentProcessor = new PaymentProcessor(
    creditCardPayment
  );

  // Pay with credit card
  paymentProcessor.processPayment(50);

  // Pay with Stripe
  paymentProcessor.setPaymentStrategy(stripePayment);
  paymentProcessor.processPayment(30);
}

strategyDemo();
