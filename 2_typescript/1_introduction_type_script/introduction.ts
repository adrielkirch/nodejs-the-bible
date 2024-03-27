// TypeScript Data Types Introduction

// 1. String
let myName: string = "John";
console.log("Name:", myName);

// 2. Number
let myAge: number = 30;
console.log("Age:", myAge);

// 3. Boolean
let isStudent: boolean = true;
console.log("Is student:", isStudent);

// 4. Array
let fruits: string[] = ["Apple", "Banana", "Orange"];
console.log("Fruits:", fruits);

// 5. Tuple
let person: [string, number] = ["John", 30];
console.log("Person:", person);

// 6. Enum
enum Color {
    Red,
    Green,
    Blue
}
let myColor: Color = Color.Green;
console.log("Color:", myColor);

// 7. Any
let variable: any = "Hello";
variable = 10; // Can change type
console.log("Variable:", variable);

// 8. Void
function saySomething(msg: string): void {
    console.log(msg);
}
saySomething("Hello World!");

// Custom Object
// Defining a custom object representing a person
type CustomerData = {
    name: string;
    age: number;
    isStudent: boolean;
};

// Creating an instance of the Person object
let personInfo: CustomerData = {
    name: "Alice",
    age: 25,
    isStudent: false
};

console.log("CustomerData Info:", personInfo);
