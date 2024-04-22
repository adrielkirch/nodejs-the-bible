const timers = require('timers/promises');
const timeoutAsync = timers.setTimeout;

// Asynchronous function with timers and Promise rejection
setTimeout(async () => {
  console.log(`starting process...`);

  // Asynchronous timeout of 100ms
  await timeoutAsync(100);
  console.count('debug...'); // Counting debug statements

  // Resolving a Promise with 'timeout order!'
  console.log(await Promise.resolve('timeout order!'));

  // Another asynchronous timeout of 100ms
  await timeoutAsync(100);
  console.count('debug...'); // Counting debug statements

  // Promise rejection with message 'promise rejected on timeout...!'
  await Promise.reject('promise rejected on timeout...!');
}, 1000);

// Synchronous function to throw an Error
const throwError = (msg) => { throw new Error(msg) };

try {
  console.log(`hello`);
  console.log(`world!`);
  throwError(`error inside try/catch`); // Throwing an error within try-catch block
} catch (error) {
  console.log(`get on catch!`, error.message); // Logging caught error message
} finally {
  console.log('executed after all...'); // Logging message after try-catch block execution
}

/**
 * Global error handlers
 */
// Handling unhandled Promise rejections
process.on('unhandledRejection', (error) => {
  console.log(`unhandledRejection: `, error.message || error); // Logging unhandled rejection message
});

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
  console.log(`uncaughtException: `, error.message || error); // Logging uncaught exception message
  // process.exit(1); // Optionally exit the process
});

// Explicitly rejecting a Promise (this will trigger 'unhandledRejection')
Promise.reject('promise rejected');

/**
 * If Promise.reject is inside another context,
 * it falls into unhandledRejection.
 */
setTimeout(async () => {
  await Promise.reject('promise async/await rejected'); // Asynchronous Promise rejection
});

/**
 * But if it's in the global context, it falls into uncaughtException.
 */
// await Promise.reject('promise async/await rejected'); // Uncommenting this line would trigger 'uncaughtException'

// Triggering uncaughtException
setTimeout(() => {
  throwError('error fora do catch!'); // Throwing an error outside try-catch block
});
