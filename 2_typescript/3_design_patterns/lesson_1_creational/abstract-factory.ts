/**
 * **Abstract Factory**
 *
 * > "Provide an interface for creating families of related or dependent
 * objects without specifying their concrete classes."
 *
 * This pattern builds on the regular Factory pattern, by adding
 * another level of abstraction (no pun intented).
 *
 * We will provide our application with a factory instance (one of two possible)
 * and let the application simply use it. This way, we can "dependency inject"
 * an appropriate factory, allowing this second level of abstraction that
 * the regular Factory pattern doesn't imply.
 *
 * The use of the factory itself, however, is exactly the same as in the
 * ordinary Factory pattern.
 *
 * The result is a highly contained and separated distinction between the
 * composition and usage of classes.
 *
 * @see https://refactoring.guru/design-patterns/abstract-factory
 * @see https://en.wikipedia.org/wiki/Abstract_factory_pattern
 */
function abstractFactoryDemo() {
  // Interfaces

  interface AbstractFactory {
    createPrimaryProduct(): AbstractProductA;
    createSecondaryProduct(): AbstractProductB;
  }

  interface AbstractProductA {
    doThis(): void;
  }

  interface AbstractProductB {
    doThat(): void;
  }



  class ChocolateFactory implements AbstractFactory {
    createPrimaryProduct() {
      return new ChocolateBar();
    }

    createSecondaryProduct() {
      return new CandyWrapper();
    }
  }

  class BicycleFactory implements AbstractFactory {
    createPrimaryProduct() {
      return new Bike();
    }

    createSecondaryProduct() {
      return new Helmet();
    }
  }

  // Chocolate factory products

  class ChocolateBar implements AbstractProductA {
    doThis() {
      console.log('ChocolateBar doThis');
    }
  }

  class CandyWrapper implements AbstractProductB {
    doThat() {
      console.log('CandyWrapper doThat');
    }
  }

  // Bicycle factory products

  class Bike implements AbstractProductA {
    doThis() {
      console.log('Bike doThis');
    }
  }

  class Helmet implements AbstractProductB {
    doThat() {
      console.log('Helmet doThat');
    }
  }

  // Let's use it!
  function myApplication(factory: AbstractFactory) {
    const productA = factory.createPrimaryProduct();
    const productB = factory.createSecondaryProduct();

    productA.doThis();
    productB.doThat();
  }

  const chocolateFactory: AbstractFactory = new ChocolateFactory();
  myApplication(chocolateFactory);

  const bicycleFactory: AbstractFactory = new BicycleFactory();
  myApplication(bicycleFactory);
}

abstractFactoryDemo();
