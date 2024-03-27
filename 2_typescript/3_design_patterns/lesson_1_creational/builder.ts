/**
 * **Builder**
 *
 * > "Separate the construction of a complex object from its representation
 * so that the same construction process can create different representations."
 *
 * Using the Builder pattern allows you to "construct" things in
 * various ways. Hence, you separate the shape and construction.
 *
 * In our example, we'll make a burger the way I like it. Using the
 * same builder, you can make one to your own liking too!
 *
 * @see https://refactoring.guru/design-patterns/builder
 * @see https://en.wikipedia.org/wiki/Builder_pattern
 */
function builderDemo() {
  class Burger {
    constructor(
      /**
       * You can do this with optional properties too, but then
       * you will have ugly "undefined" stuff, so I opted to
       * default to false instead.
       */
      public bread: string,
      public lettuce = false,
      public tomatoes = false,
      public jalapeno = false,
      public chiliMayo = false,
      public ketchup = false
    ) {
      //
    }

    addLettuce() {
      this.lettuce = true;
      return this;
    }

    addTomatoes() {
      this.tomatoes = true;
      return this;
    }

    addJalapeno() {
      this.jalapeno = true;
      return this;
    }

    addChiliMayo() {
      this.chiliMayo = true;
      return this;
    }

    addKetchup() {
      this.ketchup = true;
      return this;
    }
  }

  // Make me a burger, and hold the ketchup!
  const lunchBurger = new Burger('brioche')
    .addLettuce()
    .addTomatoes()
    .addJalapeno()
    .addChiliMayo();

  console.log(lunchBurger);
}

builderDemo();
