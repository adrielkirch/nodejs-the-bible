/**
 * WeakMaps are similar to Maps but have some key differences:
 *
 * 1. WeakMap keys must be objects, and values can be arbitrary data types.
 * 2. WeakMap keys are weakly held, meaning they do not prevent garbage collection
 *    of the object if there are no other references to it.
 * 3. WeakMaps are not iterable, meaning you cannot loop through their keys or values.
 * 4. They are useful for scenarios where you need to associate data with objects
 *    without causing memory leaks or interfering with garbage collection.
 */
const assert = require("assert");
// Create an object
// Create an object
// Create an object
let obj1 = { key: "value" };
const weakMap = new WeakMap();

// Associate data with the object in the WeakMap
weakMap.set(obj1, "associated data");

// Retrieve the associated data
console.log(weakMap.get(obj1)); // Output: 'associated data'

// Assert that the WeakMap contains the object
assert.ok(weakMap.has(obj1), "WeakMap should contain the object");

// Now, let's log the obj1Reference before and after removing the reference to obj1
let obj1Reference = obj1; // Store a reference to obj1
console.log("Before null assignment:", obj1Reference);
obj1 = null; // Remove the original reference to obj1
console.log("After null assignment:", obj1Reference);

// At this point, obj1 is no longer referenced, so it becomes eligible for garbage collection

// Trigger garbage collection (Note: This is non-standard and may not work in all JavaScript environments)
if (typeof global.gc === "function") {
  global.gc();
}


// Ensure that the WeakMap no longer contains the object after garbage collection
let isObjectRemoved = !weakMap.has(obj1Reference);
console.log("Before deleting isObjectRemoved->", isObjectRemoved);
// Delete the entry associated with obj1 from the WeakMap
weakMap.delete(obj1Reference);
isObjectRemoved = !weakMap.has(obj1Reference);
// Now, assert that the WeakMap no longer contains the object after garbage collection
console.log("After deleting isObjectRemoved->", isObjectRemoved);

console.log("Garbage collection completed.");
