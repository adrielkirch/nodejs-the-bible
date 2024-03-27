/**
 * **Decorator**
 *
 * > "Attach additional responsibilities to an object dynamically.
 * Decorators provide a flexible alternative to subclassing for
 * extending functionality."
 *
 * While _decorators_ are a feature of many languages, this is also
 * a general pattern we can use in any object-oriented language.
 *
 * The pattern is also called a "wrapper", which makes sense, as
 * what we do here is encapsulating one class within another to
 * gain extra features.
 *
 * In the example we'll use look at getting ice cream with,
 * or without, extra toppings.
 *
 * @see https://refactoring.guru/design-patterns/decorator
 * @see https://en.wikipedia.org/wiki/Decorator_pattern
 * @see Page 175 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function decoratorDemo() {
  // The ice cream interface

  interface IceCream {
    getDescription(): string;
    cost(): number;
  }

  // The basic ice cream variants

  class VanillaIceCream implements IceCream {
    getDescription() {
      return 'Vanilla Ice Cream';
    }

    cost() {
      return 2.5;
    }
  }

  class ChocolateIceCream implements IceCream {
    getDescription() {
      return 'Chocolate Ice Cream';
    }

    cost() {
      return 3.0;
    }
  }

  // An abstract class that we will override in the decorators

  abstract class IceCreamDecorator implements IceCream {
    constructor(private iceCream: IceCream) {
      //
    }

    getDescription() {
      return this.iceCream.getDescription();
    }

    cost() {
      return this.iceCream.cost();
    }
  }

  // The decorators override (`super()`) the functionality from the `IceCreamDecorator` and add the extras

  class SprinklesDecorator extends IceCreamDecorator {
    getDescription() {
      return `${super.getDescription()} with sprinkles ✨`;
    }

    cost() {
      return super.cost() + 0.5;
    }
  }

  class CherryDecorator extends IceCreamDecorator {
    getDescription() {
      return `${super.getDescription()} with a cherry on top 🍒`;
    }

    cost() {
      return super.cost() + 1.0;
    }
  }

  // Using it "vanilla" (bad pun intended)
  let iceCream: IceCream = new VanillaIceCream();
  console.log(`${iceCream.getDescription()} - $${iceCream.cost()}`);

  iceCream = new ChocolateIceCream();
  console.log(`${iceCream.getDescription()} - $${iceCream.cost()}`);

  // Using it wrapped in a decorator
  iceCream = new SprinklesDecorator(new VanillaIceCream());
  console.log(`${iceCream.getDescription()} - $${iceCream.cost()}`);

  iceCream = new CherryDecorator(new ChocolateIceCream());
  console.log(`${iceCream.getDescription()} - $${iceCream.cost()}`);
}

decoratorDemo();
