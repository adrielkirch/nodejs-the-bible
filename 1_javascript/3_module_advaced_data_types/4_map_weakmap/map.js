


/**
 * Maps in JavaScript are data structures that allow storing key-value pairs
 * where keys and values can be of any data type.
 *
 * They provide efficient methods for adding, removing, and retrieving elements.
 * Maps maintain the insertion order of elements, making them suitable for use cases
 * where the order of elements matters.
 */
const assert = require('assert');

const myMap = new Map();

// Example usage of Map:
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
console.log(myMap.get('key1')); // Output: 'value1'


/**
 * They can have anything as a key.
 */
myMap
  .set(1, 'one')
  .set('Yves', { text: 'two' })
  .set(true, () => 'hello world!');

/**
 * Using a constructor
 */
const myMapWithConstructor = new Map([
  ['1', 'str'],
  [1, 'num1'],
  [true, 'bool1']
]);

console.log('myMap', myMap, '\n');
console.log('myMap.get(1)', myMap.get(1), '\n');
assert.deepStrictEqual(myMap.get('Yves'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello world!');

/**
 * In objects the key can only be string or symbol
 * (number is coerced to string)
 */
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'Yves Guilherme' });
console.log('getWithoutReference', myMap.get({ id: 1 }), '\n'); // undefined, as it only works by reference.
console.log('getWithReference', myMap.get(onlyReferenceWorks), '\n');
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Yves Guilherme' });

/**
 * Utilities
 * - In Object it would be Object.keys({a: 1}).length
 * - In Map it's just myMap.size
 */
assert.deepStrictEqual(myMap.size, 6);

/**
 * To check if an item exists in the object
 * - In Object:
 *   item.key = if it doesn't exist, returns undefined
 *   if() = implicit coercion to boolean and returns false.
 * - The correct way in Object would be:
 *   ({ name: 'Yves }).hasOwnProperty('name');
 *
 * - In map it's just myMap.has('name');
 */
assert.ok(myMap.has(onlyReferenceWorks));

/**
 * To remove an item from the object
 *
 * - In Object it's common to use: delete item.id. However, it's inefficient for JS.
 *
 * - In map the method myMap.delete('name') is used and returns a boolean if it was removed or not.
 */
assert.ok(myMap.delete(onlyReferenceWorks));

/**
 * You can't iterate through Objects directly, but:
 * - You can iterate with for in, but it will take the index that will take the key that will return the value;
 * - To really get the key and value, we use Object.entries(item)
 *
 * - In map, it implements the generators pattern, so we can use the spread operator.
 */

console.log("[...myMap] is:")
console.log([...myMap])

for (const [key, value] of myMap) {
  console.log({ key, value }, '\n');
}

/**
 * Object is unsafe, because depending on the key name, it can override
 * some default behavior.
 *
 * ({ }).toString() === '[object Object]'
 * ({ toString: () => 'Hey' }).toString() === 'Hey'
 *
 * Any key can collide with inherited properties from object, such as,
 * constructor, toString, valueOf, etc.
 */
const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
};

/**
 * There is no restriction on key name
 */
myMap.set(actor);
assert.deepStrictEqual(myMap.has(actor), true);
assert.throws(() => myMap.get(actor).toString, TypeError);

/**
 * You can't clear an Object without reassigning it,
 * but in Map we can.
 */
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);


