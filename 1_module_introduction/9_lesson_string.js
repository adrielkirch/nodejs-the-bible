/**
 * Strings in JavaScript represent sequences of characters, and they are used to store and manipulate text data.
 * A string can be defined using single quotes (''), double quotes ("") or backticks (``), depending on the use case.
 * Strings are immutable, meaning their contents cannot be changed after they are created. Any operation that appears to modify a string actually creates a new string.
 * They can contain letters, digits, symbols, spaces, and special characters.
 * In JavaScript, strings are zero-indexed, meaning the first character is at position 0, the second character is at position 1, and so on.
 * Here is a lesson that covers various operations and methods commonly used with strings in JavaScript.
 */

// Declaration: Here we declare a string variable named 'text' and initialize it with a string value.
let text = "Hello, world!";

// Creating a new variable 'copyText' and assigning it the value of 'text'
let copyText = text;

// Modifying 'copyText' by appending ' (Copy)' to it
copyText += " (Copy)";

console.log("Original text:", text);   // Output: "Hello, world!"
console.log("Copied text:", copyText); // Output: "Hello, world! Co
console.assert(text !== copyText, "The original text and copied text should not be equal.");

// Data Type: In JavaScript, strings are a primitive data type.
console.assert(typeof text, "string");

// Length: The length property of a string returns the number of characters in the string.
console.log("Length of the string:", text.length);

// Accessing Characters: Characters in a string can be accessed using bracket notation with the index of the character.
console.log("Character at index 0:", text[0]); // Output: H
console.log("Character at index 0:", text.charAt(0)); // Output: H

//Iterate through the characters in the string
for (let char of text) {
  console.log(char);
}

// Concatenation: Strings can be concatenated using the concatenation operator (+) or the concat() method.
let concatenatedText = "Hello" + " " + "world!";
console.log("Concatenated string:", concatenatedText);

// String Methods: JavaScript provides various methods for manipulating strings.
// Here are a few examples:

// toUpperCase(): Converts all characters in a string to uppercase.
console.log("Uppercase:", text.toUpperCase());

// toLowerCase(): Converts all characters in a string to lowercase.
console.log("Lowercase:", text.toLowerCase());


// substring(): Extracts the characters in a string between two specified indices and returns the new substring.
console.log("Substring 1:", text.substring(7, 12)); // Output: world
console.log("Substring 2:", text.substring(12, 7));
// slice(): Extracts a section of a string and returns it as a new string.
console.log("Sliced:", text.slice(7, 12)); // Output: world

// indexOf(): Returns the index within the calling String object of the first occurrence of the specified value.
console.log("Index of 'world':", text.indexOf("world")); // Output: 7

// replace(): Replaces a specified value with another value in a string.
console.log("Replaced:", text.replace("world", "universe"));

// split(): Splits a string into an array of substrings based on a specified separator.
console.log("Split:", text.split(",")); // Output: ["Hello", " world!"]


// trim(): Removes whitespace from both ends of a string.
let paddedText = "   Hello, world!   ";
console.log("Trimmed:", paddedText.trim());

// Template Literals: Template literals allow for easier string interpolation and multiline strings using backticks (``).
let fullname = "John Doe";
let age = 30;
let message = `My name is ${fullname} and I am ${age} years old.`;
console.log("Template literal:", message);
