/**
 * Sets in JavaScript are powerful data structures, a crafted for managing list of unique values.
 * They excel in scenarios where you need to handle a group of elements without any duplicates.
 *
 * Use sets when:
 * - You want to store a list of elements where uniqueness is crucial, ensuring each value appears only once.
 * - When you intent to get values from twos lists concatenated together in a new list without elements repeated.
 * - You need efficient methods for adding new elements, removing existing ones, and checking for the presence of specific values.
 * - The order of elements in the collection is not important, as sets do not guarantee any specific order.
 * - You want to simplify tasks like finding unique items in a dataset or eliminating duplicate entries from a list.
 */
const assert = require("assert");

const mySet = new Set();
assert.deepStrictEqual(mySet.size, 0);
// Example usage of Set:
mySet.add("value1");
assert.deepStrictEqual(mySet.size, 1);
mySet.add("value2");
assert.deepStrictEqual(mySet.size, 2);

assert.deepStrictEqual(mySet.has("value1"), true);
assert.deepStrictEqual(mySet.has("value2"), true);

/**
 * You can't add a value that already exists in set collection
 */
mySet.add("value1");
mySet.add("value1");
mySet.add("value1");
mySet.add("value1");
mySet.add("value1");

/**
 * They can have anything as a value.
 */
mySet
  .add(1)
  .add({ text: "two" })
  .add(() => "hello world!");

assert.deepStrictEqual(mySet.size, 5);
console.log("mySet", mySet, "\n");
console.log("mySet.has(1)", mySet.has(1), "\n");
console.log("[...mySet][1] =>", [...mySet][1]);
console.log("[...mySet][2] =>", [...mySet][2]);
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
  console.log(value, "\n");
}

/**
 * Sets ensure uniqueness of values, so adding a duplicate value has no effect.
 */
mySet.add("value1");
console.log([...mySet]);

/**
 * Sets are suitable for scenarios where uniqueness is important, such as storing a collection of unique identifiers.
 * They provide efficient methods for adding, removing, and checking for the existence of elements.
 */

/**
 * Exemple concat two list eliminate duplicates
 * It usually used when you need to have list with unique items
 */
const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);
/*Ordering arr with duplicates*/
console.log("arr3", arr3.sort(), "\n");
assert.deepEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

/** Create a new set to process arr1 and arr2*/
const set = new Set();
arr3.map((item) => set.add(item));
console.log("Set with add item per item", set, "\n");
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);
console.log("Set with add item per item", set, "\n");

/** Cleaner away to create a new set to concact arr1 and arr2, using rest/spread*/
console.log("Set advanced", Array.from(new Set([...arr1, ...arr2])), "\n");
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);

/** Methods */
console.log("set.keys", set.keys(), "\n");
console.log("set.values", set.values(), "\n"); // Only exists because of map

/**
 * In a regular array, to check if an item exists, we use:
 * [].indexOf('1') !== -1 or [].includes(0);
 *
 * In a set, we use 'has', just like in Map.
 */
assert.ok(set.has('3'));

/** Exemple for Set theory ( ∪, ∩ , -*/
const users01 = new Set([
  'yves',
  'mariazinha',
  'gabi'
]);

const users02 = new Set([
  'guilherme',
  'gabi',
  'jaum'
]);

/** Items present in at least one of the arrays (Union) */
const union = new Set([...users01, ...users02]);
console.log('union', union, '\n');
console.assert(Array.from(union), ['yves', 'mariazinha', 'gabi', 'guilherme', 'jaum']);

/** Items present in both arrays (Intersection) */
const intersection = new Set([...users01].filter(user => users02.has(user)));
console.log('intersection', intersection, '\n');
console.assert(Array.from(intersection), ['gabi']);

/** Items not present in both arrays */
const difference = new Set([...users01].filter(user => !users02.has(user)));
console.log('difference', difference, '\n');
console.assert(Array.from(difference), ['yves', 'mariazinha']);