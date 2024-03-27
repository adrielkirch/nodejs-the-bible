/**
 * **Template Method**
 *
 * > "Define the skeleton of an algorithm in an operation, deferring some steps
 * to subclasses. Template Method lets subclasses redefine certain steps of
 * an algorithm without changing the algorithm's structure."
 *
 * This pattern uses good old object-oriented programming and inheritance to set
 * up an abstract class that concretions can define as they need.
 *
 * Where it differs to other behavioral patterns - such as Strategy or Composite - is
 * that this allows, first and foremost, providing functionality from the template
 * itself, and combining this with a sequential prepackaged Factory/Builder-like API.
 *
 * You might want to use this when there are parts of a codebase that have things in
 * common, but where details may sometimes drift a bit. With the flexibility of a
 * Template Method, you can address both "messy reality" while still refactoring to
 * a sensible and clean pattern.
 *
 * Our demo this time is of a travel plan that needs to accomodate both solo and
 * family plans.
 *
 * @see https://refactoring.guru/design-patterns/template-method
 * @see https://en.wikipedia.org/wiki/Template_method_pattern
 */
function templateDemo() {
  abstract class TravelPlan {
    // Run all of the steps in the template
    plan(): void {
      this.bookTickets();
      this.packLuggage();
      this.travel();
    }

    // Concrete classes must implement these
    protected abstract bookTickets(): void;
    protected abstract packLuggage(): void;

    // This may also be implemented in concrete classes
    // If not, it will fall back to this one as it's inherited
    protected travel(): void {
      console.log('Traveling to the destination.');
    }
  }

  // Concrete implementations
  class SoloTravelPlan extends TravelPlan {
    protected bookTickets() {
      console.log('Booked solo tickets.');
    }

    protected packLuggage() {
      console.log('Packed essentials for solo travel.');
    }

    // Demo of an override
    // Strictly speaking, you don't need the override keyword, but it's required in other languages so might as well be explicit about it
    //override travel() {
    //  console.log('Doing something completely different!');
    //}
  }

  class FamilyTravelPlan extends TravelPlan {
    protected bookTickets() {
      console.log('Booked family tickets.');
    }

    protected packLuggage() {
      console.log('Packed family luggage and kids essentials.');
    }
  }

  // Making travel plans...
  const soloTravelPlan: TravelPlan = new SoloTravelPlan();
  const familyTravelPlan: TravelPlan = new FamilyTravelPlan();

  soloTravelPlan.plan();
  console.log('---');
  familyTravelPlan.plan();
}

templateDemo();
