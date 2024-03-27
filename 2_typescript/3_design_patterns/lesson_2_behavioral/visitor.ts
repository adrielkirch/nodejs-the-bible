/**
 * **Visitor**
 *
 * > "Represent an operation to be performed on the elements of an object structure.
 * Visitor lets you define a new operation without changing the classes of the
 * elements on which it operates."
 *
 * Also a popular pattern in JavaScript is the use of the Visitor. It's quite common that
 * we balance concerns like "what does the object do (what is it responsible for?"
 * and "what can I decouple elsewhere?" on a daily basis. The Visitor allows doing both!
 *
 * The primary utility of the pattern is to allow separation of behavior from classes.
 * The pattern works by introducing a middle-man (the Visitor) that we can inject into
 * classes which may "accept" it. These classes can also combine the methods of the
 * Visitor with its own functionality. This way we can use both internal, as well as external,
 * logic with our objects.
 *
 * What about inheritance? Well, inheritance can easily become complicated and messy.
 * It's also not necessarily the solution to the problem of introducing logic, as the
 * Visitor can be used for objects that don't derive from the same superclasses -
 * ultimately making this powerful and flexible for many types of use cases.
 *
 * A couple of concerns with this pattern is to stay wary of breaking encapsulation (if
 * details and interfaces start spilling out uncontrollably), chaotic indirection of
 * classes and visitors, and the possibility of breaking domain logic away from their
 * logical constructs/classes (which is not a good thing).
 *
 * @see https://refactoring.guru/design-patterns/visitor
 * @see https://en.wikipedia.org/wiki/Visitor_pattern
 */
function visitorDemo() {
  interface ZooAnimal {
    accept(visitor: ZooVisitor): void;
  }

  interface ZooVisitor {
    visitLion(animal: Lion): void;
    visitPenguin(animal: Penguin): void;
  }

  // Concrete Elements
  class Lion implements ZooAnimal {
    accept(visitor: ZooVisitor) {
      visitor.visitLion(this); // We run some logic directly after having been accepted with our Visitor
    }

    roar() {
      console.log('Lion: Roar!');
    }
  }

  class Penguin implements ZooAnimal {
    accept(visitor: ZooVisitor) {
      visitor.visitPenguin(this); // We run some logic directly after having been accepted with our Visitor
    }

    slide() {
      console.log('Penguin: Whee! Sliding on ice!');
      this.feed();
    }

    feed() {
      console.log('Gonna have me some fish after all that sliding!');
    }
  }

  // Concrete Visitor class
  class MyVisitor implements ZooVisitor {
    visitLion(animal: Lion) {
      console.log("MyVisitor: Imitating the lion's roar!");
      animal.roar();
    }

    visitPenguin(animal: Penguin) {
      console.log('MyVisitor: Having a blast sliding with the penguin!');
      animal.slide();
    }
  }

  // Client code
  const lion = new Lion();
  const penguin = new Penguin();
  const visitor = new MyVisitor();

  lion.accept(visitor);
  penguin.accept(visitor);
}

visitorDemo();
