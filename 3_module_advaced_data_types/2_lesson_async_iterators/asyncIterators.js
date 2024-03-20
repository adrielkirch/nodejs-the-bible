/*
    The async operator in Node.js is used to define asynchronous functions and methods. When placed before a function declaration or expression, it indicates that the function will execute asynchronously, allowing other operations to continue while it performs its tasks.
    Async functions return a Promise, which enables handling of asynchronous operations more easily using async/await syntax. Inside an async function, you can use the await keyword to pause execution until a Promise is resolved or rejected, making asynchronous code appear synchronous and easier to read.
    Async functions are particularly useful for dealing with I/O operations, such as reading files, making HTTP requests, or querying databases, where waiting for the operation to complete without blocking the event loop is essential for performance and scalability.
    Overall, the async operator in Node.js simplifies asynchronous programming by providing a cleaner syntax for handling asynchronous operations and improving code readability.
*/
console.log("\n--- --- --- Async Iterators --- --- ---\n");

// Importing necessary functions from the 'fs/promises' module.
const { readFile, stat, readdir } = require("fs/promises");

// Defining a generator function named 'promisified'.
// This function yields promises returned by 'readFile' and a resolved promise.
console.log("__filename =>", __filename);
function* promisified() {
  yield readFile(__filename); // Yields a promise returned by 'readFile' for reading the current file.
  yield Promise.resolve("Hey dude..."); // Yields a resolved promise with the string 'Hey dude...'.
}

// Logging the iterable generated by the 'promisified' generator function.
console.log("promisified", [...promisified()]);

// Using Promise.all to resolve all promises yielded by the 'promisified' generator function.
// Then, logging the results.
Promise.all([...promisified()]).then((results) =>
  console.log("promisified", results)
);

// Immediately invoked async function expression (IIFE).
// It iterates over the promises yielded by the 'promisified' generator function using a 'for await...of' loop.
(async () => {
  for await (const item of promisified()) {
    console.log("for await", item.toString()); // Logging the resolved value of each promise converted to a string.
  }
})();