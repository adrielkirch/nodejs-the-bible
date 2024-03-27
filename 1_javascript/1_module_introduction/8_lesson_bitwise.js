/**
 * Bitwise operations in JavaScript are used to manipulate binary representations of numbers at the bit level.
 * The prefix 0b in JavaScript indicates that the following digits represent a binary (base-2) number.
 * These operations include AND (&), OR (|), XOR (^), left shift (<<), right shift (>>), and bitwise NOT (~).
 * They are commonly used in scenarios such as optimizing code, setting and clearing flags, or performing bitwise arithmetic.
 * Here is a lesson that covers various bitwise operations commonly used in JavaScript.
 */

// Declaration: Here we declare two numeric variables 'num1' and 'num2' and initialize them with binary values.
let num1 = 0b1010; // Binary representation of 10
let num2 = 0b1100; // Binary representation of 12


console.log("Original bits:", num1.toString(2), num2.toString(2));

// Bitwise AND (&): Performs a bitwise AND operation between corresponding bits of two numbers.
let resultAND = num1 & num2;
console.log("Bitwise AND:", resultAND.toString(2)); // Output: "1000" (Binary representation of 8)

// Bitwise OR (|): Performs a bitwise OR operation between corresponding bits of two numbers.
let resultOR = num1 | num2;
console.log("Bitwise OR:", resultOR.toString(2)); // Output: "1110" (Binary representation of 14)

// Bitwise XOR (^): Performs a bitwise XOR operation between corresponding bits of two numbers.
let resultXOR = num1 ^ num2;
console.log("Bitwise XOR:", resultXOR.toString(2)); // Output: "110" (Binary representation of 6)

// Bitwise Left Shift (<<): Shifts the bits of a number to the left by a specified number of positions.
let resultLeftShift = num1 << 2;
console.log("Bitwise Left Shift:", resultLeftShift.toString(2)); // Output: "101000" (Binary representation of 40)

// Bitwise Right Shift (>>): Shifts the bits of a number to the right by a specified number of positions.
let resultRightShift = num2 >> 1;
console.log("Bitwise Right Shift:", resultRightShift.toString(2)); // Output: "110" (Binary representation of 6)

// Bitwise NOT (~): Flips the bits of a number, changing 1s to 0s and vice versa.
let resultNOT = ~num1;
console.log("Bitwise NOT:", resultNOT.toString(2)); // Output: "-1011" (Binary representation of -11)

// Data Type: In JavaScript, bitwise operations are performed on numeric data types such as integers.
console.assert(typeof num1 === "number" && typeof num2 === "number");

// Note: Bitwise operations are typically used in scenarios involving binary representations of numbers or low-level optimizations.
