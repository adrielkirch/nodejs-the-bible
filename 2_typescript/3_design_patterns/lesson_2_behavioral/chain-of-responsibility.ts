/**
 * **Chain of Responsibility**
 *
 * > "Avoid coupling the sender of a request to its receiver by giving more
 * than one object a chance to handle the request. Chain the receiving objects and
 * pass the request along the chain until an object handles it."
 *
 * This pattern allows chaining of objects to handle a request.
 * It works especially well when you know there are multiple objects that
 * can handle the request, but you don't know which one will handle it.
 *
 * In the demonstration, we can set the next handler for either of
 * the two example implementations for Basic and Premium support.
 * By setting this, we can funnel a request that began at a
 * "lower level" into higher levels.
 *
 * @see https://refactoring.guru/design-patterns/chain-of-responsibility
 * @see https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern
 * @see Page 223 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function corDemo() {
  // The "abstraction", the handler interface
  interface SupportHandler {
    setNextHandler(handler: SupportHandler): void;
    handleRequest(request: SupportRequestLevel): void;
  }

  type SupportRequestLevel = 'basic' | 'premium';

  // The concrete implementations of the Support handler

  class BasicSupport implements SupportHandler {
    private nextHandler: SupportHandler | null = null;

    setNextHandler(handler: SupportHandler) {
      this.nextHandler = handler;
    }

    handleRequest(request: SupportRequestLevel) {
      console.log('Basic Support: Handling request...');
      if (request === 'basic') console.log('Basic Support: Request resolved!');
      else if (this.nextHandler) this.nextHandler.handleRequest(request);
    }
  }

  class PremiumSupport implements SupportHandler {
    private nextHandler: SupportHandler | null = null;

    setNextHandler(handler: SupportHandler) {
      this.nextHandler = handler;
    }

    handleRequest(request: SupportRequestLevel) {
      console.log('Premium Support: Handling request...');
      if (request === 'premium')
        console.log('Premium Support: Request resolved!');
      else if (this.nextHandler) this.nextHandler.handleRequest(request);
    }
  }

  const basicSupport: SupportHandler = new BasicSupport();
  const premiumSupport: SupportHandler = new PremiumSupport();

  basicSupport.handleRequest('basic');
  basicSupport.setNextHandler(premiumSupport);
  basicSupport.handleRequest('premium');
}

corDemo();
