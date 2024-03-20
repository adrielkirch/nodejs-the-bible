/**
 * Variables in JavaScript are used to store and manipulate data. There are three main ways to declare variables: var, let, and const.
 *
 * var: Before the introduction of let and const in ES6, var was the primary way to declare variables in JavaScript.
 * Variables declared with var have function scope or global scope, meaning they are accessible throughout the entire function or globally if declared outside a function.
 * However, var variables are prone to hoisting, a behavior where variable declarations are moved to the top of their containing scope during compilation, potentially leading to unexpected behavior.
 * It's generally recommended to avoid using var due to its unpredictable behavior.
 *
 * let: Introduced in ES6, let is a block-scoped variable declaration. Variables declared with let are only accessible within the block they are declared in, including nested blocks.
 * Unlike var, let variables are not hoisted, meaning they are not accessible before their declaration.
 * Using let helps in avoiding common pitfalls associated with var, such as variable hoisting and unintended global scope pollution.
 * It's the preferred way to declare variables when their values need to be reassigned.
 *
 * const: Also introduced in ES6, const is used to declare variables with constant values. Once a value is assigned to a const variable, it cannot be reassigned or redeclared.
 * Similar to let, const variables are block-scoped and not hoisted. However, while the value of a const variable cannot be changed, its properties can be modified if it holds an object or array.
 * Using const provides immutability and enhances code readability by signaling that a variable's value should not be changed.
 * It's recommended to use const by default for variables whose values do not need to be reassigned.
 */
// Examples demonstrating var, let, and const
var a = 10;
let b = 20;
const c = 30;

//let b = 40; // SyntaxError: Identifier 'b' has already been declared
//c = 40; // TypeError: Assignment to constant variable.

// Variables declared with var can be reassigned and redeclared
a = 15;
var a = 25;

// Variables declared with let can be reassigned but not redeclared
b = 25;

// Variables declared with const cannot be reassigned or redeclared
// c = 40; // TypeError: Assignment to constant variable.

console.log("Value of a (var):", a); // Output: 25
console.log("Value of b (let):", b); // Output: 25
console.log("Value of c (const):", c); // Output: 30

//Increment Three aways
b++
console.log("Value of b++ (let):", b); // Output: 26
b += 1
console.log("Value of b += 1 (let):", b); // Output: 27
b = b + 1
console.log("Value of b = b + 1 (let):", b); // Output: 28

//Decrement Three aways
b--
console.log("Value of b-- (let):", b); // Output: 27
b -= 1
console.log("Value of b -= 1 (let):", b); // Output: 26
b = b - 1
console.log("Value of b = b - 1 (let):", b); // Output: 25