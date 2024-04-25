const { Worker } = require('worker_threads'); // Importing the Worker class from the worker_threads module
const http = require('http'); // Importing the HTTP module
const os = require('os');

// Function to handle HTTP requests using worker threads
function handleRequest(request, response) {
    // Creating a new worker thread for each incoming request
    const worker = new Worker(`${__dirname}/worker.js`, { workerData: { requestUrl: request.url } });

    // Listening for messages from the worker thread
    worker.on('message', (result) => {
        // Sending the result received from the worker thread as the HTTP response
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(`Result from worker: ${result}`);
    });
    
    // Handling errors from the worker thread
    worker.on('error', (error) => {
        // Logging any errors that occur in the worker thread
        console.error('Worker error:', error);
    
        // Sending a 500 Internal Server Error response to the client
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
    });
    
    // Handling the exit of the worker thread
    worker.on('exit', (code) => {
        console.log("exit code: " + code)
        // Logging the exit code of the worker thread
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
}

// Create an HTTP server instance
const server = http.createServer(handleRequest);

// Start the HTTP server and listen for incoming requests on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
