/* Generators in JavaScript are special functions that can be paused and resumed.
They are defined using the function* syntax, and they use the yield keyword to pause execution and return values.
Generators are useful for writing asynchronous code in a synchronous style, making complex asynchronous operations easier to understand and manage.
When a generator function is called, it returns an iterator object that can be used to control the execution of the generator.
Each time the generator's next() method is called, the generator resumes execution until it encounters a yield statement or reaches the end of the function.
At that point, the value passed to yield is returned, and the generator is paused again.
Generators can also receive values from outside using the next() method, allowing for two-way communication between the generator and the caller.
Generators offer a powerful mechanism for writing clean, readable, and maintainable code, especially when dealing with asynchronous tasks and complex control flow.
Howeve */
const assert = require("assert");

console.log("\n--- --- --- Generator *function --- --- ---\n");

function* multiply(a, b) {
  yield a * b;
}
function* main() {
  yield "Hello";
  yield "for";
  yield "all";
  yield "the";
  yield "world";
  yield "!";
  yield* multiply(20, 10);
}

const generator1 = main();
var generatorMessage = {};

while (true) {
  generatorMessage = generator1.next();
  if (generatorMessage.done) {
    break;
  }
  console.log(generatorMessage);
}

//Exemple 2
const generator2 = main();
assert.deepStrictEqual(generator2.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator2.next(), { value: "for", done: false });
assert.deepStrictEqual(generator2.next(), { value: "all", done: false });
assert.deepStrictEqual(generator2.next(), { value: "the", done: false });
assert.deepStrictEqual(generator2.next(), { value: "world", done: false });
assert.deepStrictEqual(generator2.next(), { value: "!", done: false });
assert.deepStrictEqual(generator2.next(), { value: 200, done: false }); // Now it's correct
assert.deepStrictEqual(generator2.next(), { value: undefined, done: true });

//Get the array of all iterations in generator function
assert.deepStrictEqual(Array.from(main()), [
  "Hello",
  "for",
  "all",
  "the",
  "world",
  "!",
  200,
]);

