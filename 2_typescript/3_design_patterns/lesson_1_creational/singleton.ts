/**
 * **Singleton**
 *
 * > "Ensure a class has only one instance and provide a global point of access to it."
 *
 * Probably one of the most well-known design patterns, the Singleton
 * is also often called an _anti-pattern_.
 *
 * The Singleton pattern ensures that a class has only one instance
 * and provides a global point of access to that instance. In TypeScript
 * we do this by making the instance static and ensuring we disable creation
 * of new instances and always refer back to the original instance.
 *
 * Why an anti-pattern? I've found this to be great when building things
 * that are _expected_ to be global, like loggers. The problems start coming
 * when you use singletons and static or global values when it's not expected,
 * thus mutating global state.
 *
 * There is indeed a place for singletons, but always think about (as you always should)
 * if this is the correct pattern for your use-case!
 *
 * In the example we'll look at a Settings object which will be shared across all instances.
 *
 * @see https://refactoring.guru/design-patterns/singleton
 * @see https://en.wikipedia.org/wiki/Singleton_pattern
 * @see Page 127 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function singletonDemo() {
  type Mode = 'dark' | 'light';

  class Settings {
    static instance: Settings;
    private mode: Mode = 'dark';

    // Disable the possibility of creating new instances
    private constructor() {
      //
    }

    setLightMode() {
      this.mode = 'light';
    }

    setDarkMode() {
      this.mode = 'dark';
    }

    getMode() {
      return this.mode;
    }

    static getInstance(): Settings {
      if (!Settings.instance) Settings.instance = new Settings();
      return Settings.instance;
    }
  }

  //const settings = new Settings(); // Does not work: "Constructor of class 'Settings' is private and only accessible within the class declaration"
  const instance1 = Settings.getInstance();
  const instance2 = Settings.getInstance();
  instance1.setLightMode();
  instance2.setDarkMode();
  console.log(
    'Singleton demo: Is the first instance the same as the second?',
    instance1 === instance2
  ); // Same instance!
  console.log(
    'Singleton demo: ',
    'Checking modes of 1 and 2...',
    instance1.getMode(),
    instance2.getMode()
  );
}

singletonDemo();
