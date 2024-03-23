/**
 * Sets in JavaScript are data structures that allow storing unique values of any data type.
 * They provide efficient methods for adding, removing, and checking for the existence of elements.
 * Sets do not allow duplicate values, making them suitable for use cases where uniqueness is important.
 */
const assert = require('assert');

const mySet = new Set();
assert.deepStrictEqual(mySet.size, 0);
// Example usage of Set:
mySet.add('value1');
assert.deepStrictEqual(mySet.size, 1);
mySet.add('value2');
assert.deepStrictEqual(mySet.size, 2);

assert.deepStrictEqual(mySet.has('value1'),true)
assert.deepStrictEqual(mySet.has('value2'),true)

/**
 * They can have anything as a value.
 */
mySet
  .add(1)
  .add({ text: 'two' })
  .add(() => 'hello world!');
  
assert.deepStrictEqual(mySet.size, 5);
console.log('mySet', mySet, '\n');
console.log('mySet.has(1)', mySet.has(1), '\n');
console.log("[...mySet][1] =>",[...mySet][1]);
console.log("[...mySet][2] =>",[...mySet][2]);
/**
 * Utilities
 */
assert.deepStrictEqual(mySet.size, 5);

/**
 * To check if an item exists in the Set
 */
assert.ok(mySet.has(1));

/**
 * To remove an item from the Set
 */
assert.ok(mySet.delete(1));

/**
 * You can iterate through Sets using a for...of loop or using forEach.
 */
console.log("\nIterating through mySet:");
for (const value of mySet) {
  console.log(value, '\n');
}

/**
 * Sets ensure uniqueness of values, so adding a duplicate value has no effect.
 */
mySet.add('value1');
console.log([...mySet])

/**
 * Sets are suitable for scenarios where uniqueness is important, such as storing a collection of unique identifiers.
 * They provide efficient methods for adding, removing, and checking for the existence of elements.
 */

