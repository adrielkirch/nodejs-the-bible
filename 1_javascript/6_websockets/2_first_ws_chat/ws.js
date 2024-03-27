const { Server } = require('ws');
const { v4: uuidv4 } = require('uuid'); // Importing UUID library
const dateUtil = require('./dateUtil');

/**
 * This websocket aims to create a general online chat room, where everyone can communicate with one another
 */

/**
 * Represents a WebSocket server.
 * @class
 */
class WebSocket {
  /**
   * Creates an instance of WebSocket.
   * @constructor
   * @param {http.Server} server - The HTTP server instance to attach WebSocket to.
   */
  constructor(server) {
    /**
     * WebSocket Server instance.
     * @type {WebSocket.Server}
     */
    this.wss = new Server({ server });
    
    /**
     * Map to store connected clients.
     * @type {Map<string, WebSocket>}
     */
    this.clients = new Map();

    // Event handler for incoming connections
    this.wss.on('connection', (ws) => {
      /**
       * Unique identifier for the client.
       * @type {string}
       */
      const clientId = uuidv4();
      
      // Add client to the map
      this.clients.set(clientId, ws); 
      
      console.log(`Client ${clientId} has connected`);
    
      // Event handler for incoming messages from clients
      ws.on('message', (message) => {
        /**
         * Current date and time in formatted string.
         * @type {string}
         */
        const created = dateUtil.nowFormated();
        
        // Broadcast the message to all clients
        this.broadcast(message.toString("utf-8"), clientId, created);
      });

      ws.on("close", () => {
        this.clients.delete(clientId)
        console.log(`Client ${clientId} has disconnected}`);
      });

      // Send a welcome message to the client
      ws.send('Welcome to WebSocket server!');
    });
  }

  /**
   * Broadcasts a message to all connected clients.
   * @param {string} message - The message to broadcast.
   * @param {string} senderClientId - The ID of the client sending the message.
   * @param {string} created - The timestamp when the message was created.
   */
  broadcast(message, senderClientId, created) {
    this.clients.forEach((client) => {
      /**
       * Object containing message details.
       * @type {Object}
       */
      const objMessage = {
        clientId: senderClientId,
        created,
        message,
      }
      
      // Send the message to the client
      client.send(JSON.stringify(objMessage));
    });
  }
}

module.exports = { WebSocket };
