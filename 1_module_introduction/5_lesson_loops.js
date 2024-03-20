/**
 * Loops in JavaScript are used to execute a block of code repeatedly until a specified condition is met.
 * There are several types of loops commonly used in JavaScript: while loop, for loop, and for...of loop.
 *
 * while loop: The while loop executes a block of code as long as a specified condition evaluates to true.
 * It continuously checks the condition before executing the block of code.
 *
 * for loop: The for loop repeats a block of code a specified number of times.
 * It consists of three parts: initialization, condition, and increment/decrement.
 * The loop continues until the condition evaluates to false.
 *
 * for...of loop: The for...of loop is used to iterate over iterable objects such as arrays, strings, maps, sets, etc.
 * It provides a more concise syntax for iterating over elements compared to traditional for loops.
 */

// Example demonstrating for loop to print odd numbers from 0 to 10
console.log("\nOdd numbers from 0 to 10:");
for (let num = 1; num <= 10; num += 2) {
  console.log(num);
}

// Example demonstrating for...of loop to print numbers divided by 3 of an array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("\nNumbers array:");
for (let number of numbers) {
  if (number % 3 === 0) {
    console.log(number);
  }
}

// Example demonstrating for loop to print prime numbers from 0 to 100
console.log("\nPrime numbers from 0 to 100:");
for (let i = 2; i <= 100; i++) {
  let isPrime = true;
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    console.log(i);
  }
}

// Example demonstrating for loop to print Fibonacci series up to 100
console.log("\nFibonacci series up to 100:");
let fib1 = 0,
  fib2 = 1;
console.log(fib1);
console.log(fib2);
while (fib1 + fib2 <= 100) {
  let nextFib = fib1 + fib2;
  console.log(nextFib);
  fib1 = fib2;
  fib2 = nextFib;
}
