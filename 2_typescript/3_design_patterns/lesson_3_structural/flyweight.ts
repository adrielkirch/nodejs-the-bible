/**
 * **Flyweight**
 *
 * > "Use sharing to support large numbers of fine-grained objects
 * efficiently."
 *
 * This pattern is specifically aimed to optimize for memory use
 * when dealing with significant numbers of similar objects.
 *
 * Flyweight should only be considered if object identity is not
 * important. If it is, we can't use it.
 *
 * There are a few concepts to keep in mind with this one:
 * - The Flyweight interface, which (as any interface) expresses
 * what can be done on it.
 * - The concrete Flyweight, which will contain shared state across
 * all Flyweights.
 * - The Flyweight factory, which manages Flyweights.
 *
 * State is "intrinsic" (shared) or "extrinsic" (unique).
 * By minimizing the use of extrinsic or unique data, we
 * can effectively reduce the amount of memory used.
 *
 * Note that one drawback is that we have to make more
 * look-ups to find the correct Flyweight.
 *
 * @see https://refactoring.guru/design-patterns/flyweight
 * @see https://en.wikipedia.org/wiki/Flyweight_pattern
 */
function flyweightDemo() {
  interface CoffeeOrder {
    serveTable(tableNumber: number): void;
  }

  // The concrete Flyweight
  class Coffee implements CoffeeOrder {
    constructor(private flavor: string) {
      //
    }

    serveTable(tableNumber: number) {
      console.log(`Serving ${this.flavor} coffee to table ${tableNumber}`);
    }
  }

  class CoffeeFactory {
    // Intrinsic state
    private coffeeFlavors: { [key: string]: Coffee } = {};

    getCoffeeFlavor(flavor: string) {
      if (!this.coffeeFlavors[flavor])
        this.coffeeFlavors[flavor] = new Coffee(flavor);

      return this.coffeeFlavors[flavor];
    }

    getFlavors() {
      console.log(this.coffeeFlavors);
    }
  }

  // Time for some orders!

  const coffeeFactory = new CoffeeFactory();
  const orders: CoffeeOrder[] = [];

  // The coffee flavor we supply is the extrinsic state
  orders.push(coffeeFactory.getCoffeeFlavor('Espresso'));
  orders.push(coffeeFactory.getCoffeeFlavor('Americano'));
  orders.push(coffeeFactory.getCoffeeFlavor('Espresso'));
  orders.push(coffeeFactory.getCoffeeFlavor('Cappuccino'));
  orders.push(coffeeFactory.getCoffeeFlavor('Espresso'));
  orders.push(coffeeFactory.getCoffeeFlavor('Cappuccino'));
  orders.push(coffeeFactory.getCoffeeFlavor('Latte'));
  orders.push(coffeeFactory.getCoffeeFlavor('Espresso'));

  const randomNumber = () => Math.floor(Math.random() * 10) || 1;

  orders.forEach((order) => order.serveTable(randomNumber()));

  // There will only be unique flavors in the factory
  coffeeFactory.getFlavors();
}

flyweightDemo();
