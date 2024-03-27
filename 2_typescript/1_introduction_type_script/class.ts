// Example 1: Simple Person class
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
        this.greet = this.greet.bind(this); // Bind greet method to the current instance
    }

    greet() {
        console.log(`Hello, ${this.name}!`);
    }
}

let alice = new Person("Alice");
alice.greet();
let greetFunction = alice.greet; // Store the greet method as a reference
greetFunction();

console.log(Object.getPrototypeOf(alice));

// Example 2: Student subclass
class Student extends Person {
    studentId: number;

    constructor(name: string, studentId: number) {
        super(name);
        this.studentId = studentId;
    }

    study() {
        console.log(`${this.name} is studying...`);
    }
}

let bob = new Student("Bob", 12345);
bob.greet();
bob.study();

console.log(Object.getPrototypeOf(bob));

// Example 3: Employee subclass
class Employee extends Person {
    employeeId: number;

    constructor(name: string, employeeId: number) {
        super(name);
        this.employeeId = employeeId;
    }

    work() {
        console.log(`${this.name} is working...`);
    }
}

let charlie = new Employee("Charlie", 67890);
charlie.greet();
charlie.work();

console.log(Object.getPrototypeOf(charlie)); 
