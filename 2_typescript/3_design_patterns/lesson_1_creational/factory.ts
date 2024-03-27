/**
 * **Factory**
 *
 * > "Define an interface for creating an object, but let subclasses decide
 * which class to instantiate. Factory Method let a class defer instantiation
 * to subclasses."
 *
 * The Factory pattern relays creational logic to a utility (the "Factory")
 * to create concrete classes in a valid and expected shape.
 *
 * Without a Factory we would perhaps inline creation logic like this...
 * ```
 * const button1 = os === 'ios' ? new WebButton() : new MobileNativeButton();
 * const button2 = os === 'ios' ? new WebButton() : new MobileNativeButton();
 * ```
 *
 * While workable, it is messy and brings out logic in an outer scope that
 * shouldn't be exposed to it.
 *
 * While the Builder pattern is "exact" (creating on a detailed, feature-level),
 * you should typically think of the Factory as simplifying the creation.
 * If there is a 1:1 correlation between what you have to provide and what the
 * Factory does, then the Factory becomes either boilerplate or the use case
 * is too simple.
 *
 * In the example below, we will utilize a basic factory to vend the types
 * of buttons we want for some application. In this case, the Factory at least
 * brings a clear, singular interface to button creation.
 *
 * @see https://refactoring.guru/design-patterns/factory-method
 * @see https://en.wikipedia.org/wiki/Factory_method_pattern
 * @see Page 107 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function factoryDemo() {
  class ButtonFactory {
    createButton(os: ButtonOS): WebButton | MobileNativeButton {
      if (os === 'web') return new WebButton();
      if (os === 'mobile') return new MobileNativeButton();
      else throw new Error('Unknown OS!');
    }
  }

  type ButtonOS = 'web' | 'mobile';

  class WebButton {
    //
  }

  class MobileNativeButton {
    //
  }

  // Let's take it for a spin
  const factory = new ButtonFactory();

  const webButton = factory.createButton('web');
  console.log(webButton);
  const mobileButton = factory.createButton('mobile');
  console.log(mobileButton);
}

factoryDemo();
