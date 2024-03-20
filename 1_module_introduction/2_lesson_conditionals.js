/**
 * Conditionals in JavaScript are used to execute different code blocks based on specified conditions.
 * There are several types of conditionals commonly used in JavaScript: if statements, else if statements, else statements, switch statements, and ternary operators.
 *
 * if statement: The if statement is used to execute a block of code if a specified condition evaluates to true.
 * It can be followed by zero or more else if statements and an optional else statement.
 *
 * else if statement: The else if statement is used to specify a new condition if the previous condition(s) in the if statement evaluates to false.
 * It can be used multiple times to check for multiple conditions.
 *
 * else statement: The else statement is used to execute a block of code if none of the previous conditions in the if statement or else if statements evaluate to true.
 * It is optional and can only appear after an if statement or an else if statement.
 *
 * switch statement: The switch statement is used to perform different actions based on different conditions.
 * It evaluates an expression, and based on the value of the expression, executes the corresponding case block.
 *
 * ternary operator: The ternary operator (also known as the conditional operator) is a concise way to write if-else statements in a single line.
 * It consists of a condition followed by a question mark (?), then an expression to execute if the condition is true, followed by a colon (:), and finally an expression to execute if the condition is false.
 * It's often used for simple conditional assignments or to return values based on conditions.
 */

// Example demonstrating if-else if-else conditional statements
let num = 20;

if (num > 0) {
  console.log("Number is positive");
} else if (num < 0) {
  console.log("Number is negative");
} else {
  console.log("Number is zero");
}

// Example demonstrating switch statement
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Today is Monday");
    break;
  case "Tuesday":
    console.log("Today is Tuesday");
    break;
  case "Wednesday":
    console.log("Today is Wednesday");
    break;
  default:
    console.log("Today is not Monday, Tuesday, or Wednesday");
}

// Example demonstrating ternary operator
let age = 20;
let message = (age >= 18) ? "You are an adult" : "You are a minor";
console.log(message);
