/**
 * A Node.js lesson focused in understanding classes and inheritance in JavaScript.
 * @class
 */
class Person {
    /**
     * Create a person.
     * @constructor
     * @param {string} name - The name of the person.
     * @param {string} country - The country the person is from.
     * @param {string} identityCode - The identity code of the person.
     */
    constructor(name, country, identityCode) {
        this.name = name;
        this.identityCode = identityCode;
        this.country = country;
    }

    /**
     * Greet the person.
     * @returns {string} A greeting message.
     */
    greet() {
        return `Hello, my name is ${this.name} and I'm from ${this.country}.`;
    }

    /**
     * Get the identity code of the person.
     * @returns {string} The identity code.
     */
    getIdentityCode() {
        return this.identityCode;
    }
}

/**
 * Represents a student who is a person and has a student ID.
 * @class
 * @extends Person
 */
class Student extends Person {
    /**
     * Create a student.
     * @constructor
     * @param {string} name - The name of the student.
     * @param {string} country - The country the student is from.
     * @param {string} studentId - The student ID of the student.
     */
    constructor(name, country, studentId) {
        super(name, country);
        this.studentId = studentId;
    }

    /**
     * Indicate that the student is studying.
     * @returns {string} A message indicating the student is studying.
     */
    study() {
        return `${this.name} is studying.`;
    }

    /**
     * Greet the student.
     * @returns {string} A greeting message.
     */
    greet() {
        return `Hi, I'm ${this.name}, a student from ${this.country}.`;
    }
}

/**
 * Represents an employee who is a person and has a department and salary.
 * @class
 * @extends Person
 */
class Employee extends Person {
    /**
     * Create an employee.
     * @constructor
     * @param {string} name - The name of the employee.
     * @param {string} country - The country the employee is from.
     * @param {string} department - The department the employee belongs to.
     * @param {number} salary - The salary of the employee.
     */
    constructor(name, country, department, salary) {
        super(name, country);
        this.department = department;
        this.salary = salary;
    }

    /**
     * Indicate that the employee is managing a department.
     * @returns {string} A message indicating the employee is managing a department.
     */
    manage() {
        return `${this.name} is managing the ${this.department} department.`;
    }

    /**
     * Greet the employee.
     * @returns {string} A greeting message.
     */
    greet() {
        return `Greetings, I'm ${this.name}, an employee from ${this.country}.`;
    }
}

/**
 * Represents a director who is an employee and has the same properties as an employee.
 * @class
 * @extends Employee
 */
class Director extends Employee {
    /**
     * Create a director.
     * @constructor
     * @param {string} name - The name of the director.
     * @param {string} country - The country the director is from.
     * @param {string} department - The department the director belongs to.
     * @param {number} salary - The salary of the director.
     */
    constructor(name, country, department, salary) {
        super(name, country, department, salary);
    }

    /**
     * Indicate that the director is coordinating a department.
     * @returns {string} A message indicating the director is coordinating a department.
     */
    coordinate() {
        return `${this.name} is managing the ${this.department} department.`;
    }
}

/**
 * Represents a teacher who is an employee and has the same properties as an employee.
 * @class
 * @extends Employee
 */
class Teacher extends Employee {
    /**
     * Create a teacher.
     * @constructor
     * @param {string} name - The name of the teacher.
     * @param {string} country - The country the teacher is from.
     * @param {string} department - The department the teacher belongs to.
     * @param {number} salary - The salary of the teacher.
     */
    constructor(name, country, department, salary) {
        super(name, country, department, salary);
    }

    /**
     * Indicate that the teacher is teaching a department.
     * @returns {string} A message indicating the teacher is teaching a department.
     */
    teach() {
        return `${this.name} is teaching the ${this.department} department.`;
    }
}

// Usage
const student = new Student("Alice", "USA", "021512345"); // Object instantiation
const director = new Director("John", "Brazil", "062451723"); // Object instantiation

/**
 * The prototype chain is a concept in JavaScript that helps objects inherit properties and methods from other objects.
 */

// Director's prototype should be Employee
console.assert(Director.prototype.__proto__ === Employee.prototype, 'Director prototype should be Employee');

// Employee's prototype should be Person
console.assert(Employee.prototype.__proto__ === Person.prototype, 'Employee prototype should be Person');

// Student's prototype should be Person
console.assert(Student.prototype.__proto__ === Person.prototype, 'Student prototype should be Person');
