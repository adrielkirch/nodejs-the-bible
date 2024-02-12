

/**
Node.js shines in its ability to handle asynchronous operations. Let’s dive deeper into how it achieves this. 🏊‍♂️

Callbacks 📞: In Node.js, callbacks are the primary way we handle asynchronous operations. You initiate an I/O operation, and instead of waiting for it to complete, you pass in a callback function that gets executed when the operation is done. This means your program isn’t blocked, and can do other tasks in the meantime. 🚀

Promises 🤞: Promises are a more modern approach to handle asynchronous operations in Node.js. A Promise represents a value that may not be available yet but will be resolved at some point in the future. It helps us write cleaner, more readable code, especially when dealing with complex nested callbacks, often referred to as “callback hell”. 🔥

Async/Await ⏳: Async/Await is a syntactic sugar on top of Promises, making asynchronous code look and behave like synchronous code. It makes our code even more readable and easier to understand. 📖

Events 🎫: Node.js is built around an event-driven architecture, which means it triggers and listens for different types of events. This is handled by the EventEmitter class, which is used to bind functions (event handlers) to named events. When the event occurs (is emitted), the event handlers are called synchronously. 🎉
Stay tuned for more deep dives into Node.js! 💡
*/

/**
 * Function with a callback.x   
 * @param {Function} callback - The callback function to be executed.
 */
function asyncFunctionWithCallback(callback) {
    setTimeout(() => {
        const data = 'Data fetched via callback';
        callback(null, data);
    }, 1000);
}

/**
 * Function returning a Promise.
 * @returns {Promise<string>} A promise that resolves with fetched data.
 */
function asyncFunctionWithPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = 'Data fetched via promise';
            resolve(data);
        }, 1000);
    });
}

/**
 * Async function using async/await.
 * @returns {Promise<string>} A promise that resolves with fetched data.
 */
async function asyncFunctionWithAsyncAwait() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = 'Data fetched via async/await';
            resolve(data);
        }, 1000);
    });
}


const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
/**
 * Function with event emitter.
 * @param {MyEmitter} emitter - The event emitter instance.
 */
function asyncFunctionWithEventEmitter(emitter) {
    setTimeout(() => {
        const data = 'Data fetched via event emitter';
        emitter.emit('data', data);
    }, 1000);
}

/**
 * Main function to demonstrate usage of asynchronous functions.
 */
async function main() {
    // 1. Using a callback function
    asyncFunctionWithCallback((error, data) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Callback function:', data);
        }
    });

    // 2. Using a promise
    asyncFunctionWithPromise()
        .then(data => {
            console.log('Promise:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 3. Using async/await
    try {
        const data = await asyncFunctionWithAsyncAwait();
        console.log('Async/Await:', data);
    } catch (error) {
        console.error('Error:', error);
    }

    // 4. Using event emitter
    const emitter = new MyEmitter();
    emitter.on('data', data => {
        console.log('Event emitter:', data);
    });
    asyncFunctionWithEventEmitter(emitter);
}

main();
