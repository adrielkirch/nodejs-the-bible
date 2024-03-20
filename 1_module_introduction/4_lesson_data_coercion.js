// Example 1: Explicit conversion to string
console.assert(String(123) === '123', 'Explicit conversion to string');

// Example 2: Implicit conversion to string
console.assert(123 + '' === '123', 'Implicit conversion to string');

// Example 3: Explicit conversion to integer
console.assert(parseInt("10") === 10, 'Explicit conversion to Integer');

// Example 4: Explicit conversion to float
console.assert(parseFloat("10.5") === 10.5, 'Explicit conversion to Float');

// Example 5: Careful with implicit conversions
console.assert(9999999999999999 === 10000000000000000, 'Equality test with large numbers');

// Example 6: Implicit conversion from boolean to number
console.assert(true + 2 === 3, 'Should be 3');

// Example 7: Implicit conversion from boolean to number in subtraction
console.assert(2 - true === 1, 'Should be 1');

// Example 8: Chained comparison
console.assert(3 > 2 >= 1 === true, 'Should be true');
/**
 * The expression 3 > 2 returns true, because 3 is greater than 2.
 * Then, the expression true > 1 is evaluated. Here's the issue: JavaScript tries to convert true into a number, which is converted to 1.
 * Therefore, you're essentially doing 1 > 1, which is false.
 * 
 * Thus, the expression 3 > 2 > 1 is evaluated as true > 1, which is false.
 */
console.assert(3 > 2 > 1 === false, 'Should be false');
// Example 9: Loose equality comparison
console.assert('1' == 1, "'1' == 1 - is equivalent");

// Example 10: Loose equality comparison between boolean and number
console.assert(true == 1, 'true == 1 - is equivalent');

// Example 11: Loose equality comparison between number and boolean
console.assert(0 == false, '0 == false - is equivalent');

// Example 12: Loose equality comparison between null and undefined
console.assert(null == undefined, 'null == undefined is equivalent');

// Example 13: Adding strings and numbers
console.assert('5' + 3 === '53', "Adding '5' + 3 returns '53'");

// Example 13: Adding strings and numbers (with parentheses for clarity)
console.assert('5' + (3 + 4) === '57', "Adding '5' + (3 + 4) returns '57'");

/// Example 13: Adding strings and numbers (with explicit conversion)
console.assert('5' + Number('3') === '53', "Adding '5' + Number('3') returns '53'");

// Example 14: Boolean logical operations
console.assert(true && false === false, "true && false is false");
console.assert(true || false === true, "true || false is true");
console.assert(!true === false, "!true is false");

// Example 15: Ternary operator
console.assert(true ? 1 : 2 === 1, "Ternary operator returns 1 for true condition");
console.assert(false ? 1 : 2 === 2, "Ternary operator returns 2 for false condition");

// Example 16: Typeof operator
console.assert(typeof 42 === 'number', "typeof 42 is 'number'");
console.assert(typeof 'Hello' === 'string', "typeof 'Hello' is 'string'");
console.assert(typeof true === 'boolean', "typeof true is 'boolean'");
console.assert(typeof {name: 'John'} === 'object', "typeof {name: 'John'} is 'object'");


// Primitive vs. Object behavior in Nodejs:

// Example 17: Primitive type behavior (Number)
let num1 = 42;
let num2 = num1; // num2 gets a copy of the primitive value of num1
num2++; 
console.assert(num2 > num1, "Incrementing num2 does not affect num1");

// Example 18: Object reference behavior
let obj = {name: 'Alice', age: 30}; 
let objClone = obj; // objClone now points to the same object memory as obj, not a copy

// Modifying objClone also modifies obj because they reference the same object
objClone.name = "Halice";
objClone.birthdate = '1978-01-01';

// Both obj and objClone have the same set of keys and values since they share the same reference
// So, checking the length of keys in obj will include keys added through objClone
console.assert(Object.keys(obj).length === 3, "Number of keys in object is 3");

// Similarly, searching for 'Halice' will find it in both obj and objClone
console.assert(Object.values(obj).includes('Halice'), "Object contains 'Halice'");
// Conversely, 'Alice' is no longer present since it was modified to 'Halice'
console.assert(!Object.values(obj).includes('Alice'), "Object not contains 'alice'");