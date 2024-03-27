"use strict";

/**
 * In JavaScript, a Proxy object is used to define custom behavior for fundamental operations (e.g., property lookup, assignment, enumeration, function invocation) on objects.
 * It allows you to intercept and customize operations performed on an object, providing a powerful mechanism for implementing metaprogramming features.
 * Proxies are created using the `new Proxy()` constructor, which takes two arguments: the target object and a handler object.
 * The handler object contains traps, which are methods that intercept operations performed on the target object.
 * Common traps include `get` for property access, `set` for property assignment, `apply` for function invocation, and more.
 * When an operation is performed on the proxied object, the corresponding trap is invoked, allowing you to customize the behavior as needed.
 * Proxies are often used for implementing features such as logging, validation, caching, access control, and more.
 * However, it's essential to use proxies judiciously, as they can introduce complexity and performance overhead if misused.
 */

const Event = require("events");
const event = new Event();
const eventName = "counter";
event.on(eventName, (msg) => console.log("counter updated", msg));

const myCounter = {
  counter: 0,
};
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, prop) => {
    // console.log('chamou!', { object, prop });
    return object[prop];
  },
});

/**
 * Executes a task that will be performed in the future and
 * will continue to be executed.
 * "In a little while and forever"
 */
setInterval(function () {
  proxy.counter += 1;
  console.log("[3]: setInterval!");

  if (proxy.counter === 10) {
    clearInterval(this);
  }
}, 300);

/**
 * It is a bad practice to use 0 to execute setTimeout
 * at the exact moment (using 0 ms).
 * setTimeout is for something that will happen in the future.
 */
setTimeout(() => {
  proxy.counter = 4;
  console.log("[2]: timeout!");
}, 150);

/**
 * If you want it to execute now.
 */
setImmediate(() => {
  console.log("[1]: setImmediate!", proxy.counter);
});

/**
 * Executes now, right now, but ends the node's lifecycle.
 * It is a bad practice to use it this way.
 */
process.nextTick(() => {
  proxy.counter = 2;
  console.log("[0]: nextTick!");
});

/**
 * Order of execution:
 * process.nextTick -> setImmediate -> setTimeout -> setInterval
 */
