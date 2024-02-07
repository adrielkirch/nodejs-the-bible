const EventEmitter = require('events');

// Define a custom event emitter
class MyEmitter extends EventEmitter {}

/**
 * Function with a callback.
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
