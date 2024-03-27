/**
 * **Prototype**
 *
 * > "Specify the kinds of objects to create using a prototypical instance, and
 * create new objects by copying this prototype."
 *
 * Using a Prototype allows copying existing objects into a completely
 * new, separate object without any relation to the one copied.
 * This pattern I don't see a lot anymore. Maybe because it's both very powerful
 * and because it lacks the clear and cohesive expressiveness of using
 * object-oriented programming.
 *
 * The power comes with this being highly dynamic. In the book Design Patterns
 * this is said to be a valid pattern when the conditions are highly variable,
 * and we want to compose at real-time.
 *
 * Again: Once upon a time is JavaScript land, you would see prototype extension quite
 * a lot, but it's becoming less of a thing, probably because the language is
 * getting more and more OOP features and we see less JS-weird/idiomatic stuff.
 *
 * @see https://refactoring.guru/design-patterns/prototype
 * @see https://en.wikipedia.org/wiki/Prototype_pattern
 */
function prototypeDemo() {
  const zombie = {
    eatBrains() {
      return 'Yummy 🧠!';
    }
  };

  // Chad is built from the zombie
  const chad = Object.create(zombie, { name: { value: 'Chad' } });
  /**
   * You can now get the prototype with either `chad.__proto__` or `Object.getPrototypeOf(chad)`.
   */

  // Baby Chad is built from Chad (who was built from the zombie)
  const babyChad = Object.create(chad, { baby: { value: true } });
  console.log(`Prototype demo: The zombie baby is named ${babyChad.name} too!`);
  console.log(babyChad.eatBrains());
}

prototypeDemo();
