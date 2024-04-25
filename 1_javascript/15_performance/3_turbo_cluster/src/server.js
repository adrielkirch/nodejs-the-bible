import { createServer } from "http";
import { appendFile } from "fs/promises";

/**
 * Initializes the server.
 * 
 * The server listens on port 3000 and processes incoming requests by executing the provided request handler function.
 * Additionally, a simulated error is triggered after a random timeout using setTimeout to demonstrate fault tolerance handling.
 * 
 * @function initializeServer
 */
export function initializeServer() {
    /**
     * Request handler function for processing incoming requests.
     * 
     * @param {http.IncomingMessage} request - The incoming request object.
     * @param {http.ServerResponse} response - The server response object.
     */
    async function handler(request, response) {
      // Log the processing of the request
      await appendFile("./log.txt", `processed by ${process.pid}\n`);
  
      // Generate a result by summing up random numbers
      const result = Array.from({ length: 1e3 }, (_) =>
        Math.floor(Math.random() * 40)
      ).reduce((prev, next) => prev + next, 0);
  
      // Send the result as the response
      response.end(result.toString());
    }
  
    // Create a server instance and start listening on port 3000
    createServer(handler).listen(3000, () =>
      console.log(`Server listening on port 3000 and pid ${process.pid}`)
    );
  
    // Simulate an error by exiting the process after a random timeout
    setTimeout(() => {
      process.exit(1);
    }, Math.random() * 1e4);
  }
  