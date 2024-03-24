const WebSocket = require("ws"); // Import WebSocket module
const { Stopwatch } = require("./stopwatch"); // Import Stopwatch class

/**
 * Initialize a WebSocket server for stopwatch functionality.
 *
 * This function creates a WebSocket server, instantiates a Stopwatch object, and handles
 * incoming connections, messages, and disconnections from clients.
 *
 * @param {http.Server} server - The HTTP server instance to attach the WebSocket server to.
 */
function websocket(server) {
  const clients = new Set();
  /**
   * Broadcast the current stopwatch time to all connected clients.
   */
  function broadcastTime() {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ time: this.formatTime(this.elapsedTime) })
        );
      }
    });
  }

  /**
   * Handle incoming messages from clients.
   * Parses the message and performs corresponding actions (start, stop, reset).
   * @param {string} message - The message received from a client.
   * @param {Stopwatch} stopwatch - The stopwatch object
   */
  function handleMessage(message, stopwatch) {
    console.log("Received message:", message);
    switch (message) {
      case "start":
        stopwatch.startStopwatch();
        break;
      case "stop":
        stopwatch.stopStopwatch();
        break;
      case "reset":
        stopwatch.resetStopwatch();
        break;
      default:
        console.log("Unknown command received:", message);
    }
  }

  /**
   * Handle incoming messages from clients.
   * @param {string|Buffer} message - The message received from a client.
   * @param {Stopwatch} stopwatch - The stopwatch object
   */
  function eventMessage(message, stopwatch) {
    if (typeof message === "string") {
      // If message is already a string, use it directly
      handleMessage(message, stopwatch);
    } else if (Buffer.isBuffer(message)) {
      // If message is a buffer, convert it to a string
      const messageString = message.toString("utf-8");
      handleMessage(messageString, stopwatch);
    } else {
      console.log("Unknown message format received:", message);
    }
  }

  /**
   * Handle closing connections with clients.
   */
  function eventClose() {
    clients.delete(ws);
  }

  // Create WebSocket server instance
  const wss = new WebSocket.Server({ server });

  // Create Stopwatch instance with WebSocket server and broadcast function
  const stopwatch = new Stopwatch(broadcastTime);

  // Event listener for new connections
  wss.on("connection", (ws) => {
    clients.add(ws); // Add client to the set of connected clients

    // Event listener for incoming messages from clients
    ws.on("message", (message) => {
      eventMessage(message,stopwatch);
    });

    // Event listener for closing connections
    ws.on("close", () => {
      eventClose();
    });
  });
}

module.exports = { websocket };
