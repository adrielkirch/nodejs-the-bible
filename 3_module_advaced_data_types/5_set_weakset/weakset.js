/**
 * ### WeakSet
 *
 * Similar to WeakMap.
 * - Not enumerable (iterable);
 * - Only works with keys as references;
 * - Has only simple methods.
 */

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user2);
weakSet.has(user2);
const assert = require('assert');

const myWeakSet = new WeakSet();

// Example usage of WeakSet:
const obj1 = {};
const obj2 = {};
myWeakSet.add(obj1);
myWeakSet.add(obj2);

// WeakSets do not have a 'size' property like Sets
console.log("myWeakSet size: Cannot determine in WeakSet");

// Checking if objects exist in the WeakSet
assert.ok(myWeakSet.has(obj1));
assert.ok(myWeakSet.has(obj2));

/**
 * WeakSets can only store objects as values.
 */
const nonObjectValue = 'someValue';
assert.throws(() => myWeakSet.add(nonObjectValue), TypeError);

/**
 * WeakSets do not support iteration or enumeration of their elements.
 */
console.log("\nCannot iterate through elements in a WeakSet");

/**
 * WeakSets do not support deletion of individual elements.
 * Elements are automatically removed when the object they reference is garbage collected.
 */
console.log("\nCannot delete individual elements from a WeakSet");

/**
 * WeakSets are suitable for scenarios where temporary associations between objects are needed, and memory management is important.
 * They provide a way to associate data with objects without preventing those objects from being garbage collected.
 */
