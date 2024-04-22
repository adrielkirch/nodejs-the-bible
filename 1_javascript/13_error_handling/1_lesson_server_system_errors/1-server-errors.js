const Http = require("http");

const SERVER_PORT = 3000;
let COUNT = 1;


/**
 * Handles HTTP requests asynchronously, with robust error handling.
 * @param {http.IncomingMessage} request - The incoming HTTP request.
 * @param {http.ServerResponse} response - The HTTP server response.
 * @returns {Promise<void>} A promise that resolves when request processing is complete.
 */
async function handler(request, response) {
  COUNT++;

  try {
    if (COUNT % 2 === 0) {
      await Promise.reject(`error inside handler!`);
    }

    /**
     * 'For await' has a different context in JS and the error should be
     * handled in a different way.
     */
    for await (const data of request) {
      try {
        if (COUNT % 2 !== 0) {
          await Promise.reject(`error inside for!`);
        }

        // response.end();
      } catch (error) {
        console.log(`a request error has happened`, error);
        response.writeHead(500);
        response.write(JSON.stringify({ message: `internal server error!` }));
        // response.end();
      }
    }
  } catch (error) {
    console.log(`a server error has happened`, error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: `internal server error!` }));
    response.end();
  } finally {
    response.end();
  }
}

Http.createServer(handler).listen(SERVER_PORT, () =>
  console.log(`Running at ${SERVER_PORT}`)
);
