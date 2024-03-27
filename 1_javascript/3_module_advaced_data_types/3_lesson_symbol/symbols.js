/**
 * Symbols in JavaScript are a primitive data type introduced in ECMAScript 6 (ES6).
 * They are unique and immutable data types, meaning each symbol value is unique and cannot be changed.
 * Symbols are often used as unique keys in object properties to avoid naming collisions.
 * Unlike strings, symbols don't have a predefined value and are not automatically converted to strings when used as object keys.
 * Symbols are created using the `Symbol()` function, which returns a new unique symbol each time it's called.
 * Symbols can also have an optional description, which is useful for debugging but does not affect their uniqueness.
 * Symbols are primarily used to add metadata or unique identifiers to objects without the risk of unintentional conflicts.
 * Symbols can be used to emulate private properties and methods in JavaScript classes.
 */
const assert = require("assert");
// Creating a symbol named 'key'
const key = Symbol();

// Creating an object with a property using the symbol as the key
const obj = {
  [key]: "value",
};

// Accessing the property using the symbol as the key
console.log(obj[key]); // Output: 'value'

// Trying to access the property using a string key (which won't work)
console.log(obj["key"]); // Output: undefined

/**
 * Symbols are often used as unique keys in object properties to avoid naming collisions.
 */

// Creating two symbols with the same description, there are not equal because each symbol is unique
const symbol1 = Symbol("description of symbol");
const symbol2 = Symbol("description of symbol");

console.log(symbol1 === symbol2); // Output: false
console.assert(symbol1 !== symbol2);

/**
Create a unique key, where we are sure that
it is unique in terms of memory reference; every
time we call Symbol, it creates a completely
different address.
*/
const uniqueKey = Symbol("username");
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for symbol";

console.log("getting normal Objects - ", user.userName); // value for normal Objects

// It will always be unique in terms of memory address.
console.log("getting normal Objects - ", user[Symbol("username")]); // undefined
console.log("getting normal Objects - ", user[uniqueKey]); // value for symbol

console.log("####### \n");

console.assert(
  user.userName === "value for normal Objects",
  "Assertion failed for userName property"
);
console.assert(
  user[Symbol("username")] === undefined,
  "Assertion failed for Symbol('username') property"
);
console.assert(
  user[uniqueKey] === "value for symbol",
  "Assertion failed for uniqueKey property"
);

/**
 * Symbols can be used to emulate private properties and methods in JavaScript classes.
 */
const _privateMethod = Symbol("privateMethod");

class MyClass {
  constructor() {
    // Initialize any properties or methods
  }

  // Public method that can access the private method
  publicMethod() {
    return this[_privateMethod]();
  }

  // Private method defined using a symbol
  [_privateMethod]() {
    return "This is a private method";
  }
}

// Create an instance of MyClass
const myObject = new MyClass();

// Call the public method, which in turn calls the private method
console.log(myObject.publicMethod()); // Output: "This is a private method"
console.assert(myObject.publicMethod(), "This is a private method");
console.assert(myObject[_privateMethod], undefined);
console.log("####### \n");
//Attempting to call the private method directly will result in an error
//myObject._privateMethod();

/*
  This object `obj2` is designed to be an iterable object, utilizing iterators.
  It has a property `[Symbol.iterator]`, which defines an iterator function.
  The iterator function returns an object with two properties:
    - `items`: an array of elements to iterate over.
    - `next()`: a method that returns the next element in the iteration sequence.
      It removes the last element from the `items` array and returns it.
      If there are no more elements to iterate over, it sets `done` to true.
*/

const obj2 = {
  // Iterators
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        // remove last array element and returns it
        value: this.items.pop(),
      };
    },
  }),
};

for (const item of obj2) {
  console.log("item", item);
}
console.log("Array from", Array.from(obj2));
console.log("Rest/Spread", [...obj2]);
console.log("####### \n");

/*
  This class `MyDate` represents a custom date object.
  It utilizes symbols for private properties and to define special behaviors.
*/

// A symbol used as a private property key
const kItems = Symbol("kItems");

// Class definition for MyDate
class MyDate {
  // Constructor function
  constructor(...args) {
    // Initializes the private property `kItems` with an array of Date objects
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  // Custom private coercion method toPrimitive
  [Symbol.toPrimitive](coercionType) {
    // Throws a TypeError if the coercion type is not 'string'
    if (coercionType !== "string") {
      throw new TypeError();
    }

    // Formats each Date object in `kItems` array into a string representing a date
    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );

    // Formats the array of formatted date strings into a human-readable list
    return new Intl.ListFormat("en-US", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  // Custom iterator private method for synchronous iteration
  *[Symbol.iterator]() {
    // Iterates over each Date object in `kItems` array and yields them one by one
    for (const item of this[kItems]) {
      yield item;
    }
  }

  // Custom private iterator method for asynchronous iteration
  async *[Symbol.asyncIterator]() {
    // Utility function to create a delay
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));

    // Iterates over each Date object in `kItems` array asynchronously
    for (const item of this[kItems]) {
      // Waits for 100ms before yielding each item
      await timeout(100);
      // Yields the Date object converted to its ISO string representation
      yield item.toISOString();
    }
  }

  // Custom getter for the toStringTag symbol
  get [Symbol.toStringTag]() {
    // Returns a custom string representing the class's type
    return "WHAT?";
  }
}

// Remember that in JavaScript, months start at 0!
const myDate = new MyDate(
  [2020, 0, 1], // yyyy-MM-dd
  [2018, 1, 2], // yyyy-MM-dd
  [2022, 11, 25] // yyyy-MM-dd
);

const expectedDates = [
  new Date(2020, 0, 1),
  new Date(2018, 1, 2),
  new Date(2022, 11, 25),
];

// console.log('myDate', myDate);
assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object WHAT?]"
);
// console.log('myDate + 1' , myDate + 1);
assert.throws(() => myDate + 1);

// Explicit coercion to invoke the toPrimitive method
console.log("String(myDate)", String(myDate));
assert.deepStrictEqual(
  String(myDate),
  "January 01, 2020, February 02, 2018, and December 25, 2022"
);

// Implement the iterator!
assert.deepStrictEqual([...myDate], expectedDates);
