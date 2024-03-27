/**
 * **Composite**
 *
 * > "Compose objects into tree structures to represent part-whole hierarchies.
 * Composite lets clients treat individual objects and compositions of objects
 * uniformly."
 *
 * Sounds great, but maybe a bit puzzling. Again, given an example, you'll
 * see it's quite clear.
 *
 * We'll create a company that consists of teams. Each team has zero or more employees
 * with a few different roles (developer or designer).
 *
 * In our case, the "leafs" will be the employees, and the "composites" are
 * the teams (even the company is just a team of teams). The "component"
 * each object uses is the `Employee` interface.
 *
 * @see https://refactoring.guru/design-patterns/composite
 * @see https://en.wikipedia.org/wiki/Composite_pattern
 * @see Page 163 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function compositeDemo() {
  // This interface (component) is what can be manipulated in our composites.
  interface Employee {
    showDetails(): string;
  }

  class Developer implements Employee {
    constructor(private name: string) {
      //
    }

    showDetails() {
      return `Developer: ${this.name}`;
    }
  }

  class Designer implements Employee {
    constructor(private name: string) {
      //
    }

    showDetails() {
      return `Designer: ${this.name}`;
    }
  }

  class Team implements Employee {
    private name: string;
    private members: Employee[] = [];

    constructor(name: string) {
      this.name = name;
    }

    addMember(member: Employee) {
      this.members.push(member);
    }

    showDetails() {
      return (
        `Team members in ${this.name}:\n` +
        this.members.map((member) => `${member.showDetails()}\n`).join('')
      );
    }
  }

  // Let's try it!

  // Team 1
  const john: Employee = new Developer('John');
  const jane: Employee = new Designer('Jane');
  const team1: Team = new Team('Team 1');
  team1.addMember(john);
  team1.addMember(jane);

  // Team 2
  const mike: Employee = new Developer('Mike');
  const team2: Team = new Team('Team 2');
  team2.addMember(mike);

  // Company
  const company: Team = new Team('BigCorp');
  company.addMember(team1);
  company.addMember(team2);

  console.log(company.showDetails());
}

compositeDemo();
