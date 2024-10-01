const { Server } = require("ws");
const { v4: uuidv4 } = require("uuid");
const dateUtil = require("./dateUtil");
const { KafkaSingleton } = require("./kafka");

/**
 * This websocket aims to create multiple online company fleet real time observing, where each room can have (1,N) clients that may communicate with only that specific group room, each group room is related to a roomId
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
    if (!WebSocket.instance) {
      /**
       * WebSocket Server instance.
       * @type {WebSocket.Server}
       */
      this.wss = new Server({ server });

      /**
       * Map to store rooms.
       * @type {Map<string, WebSocket>}
       */
      this.rooms = new Map();

      // Initialize Kafka consumer
      this.initKafkaConsumer();

      // Event handler for incoming connections
      this.wss.on("connection", (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const roomId = url.searchParams.get("roomId") || uuidv4();
        /**
         * Unique identifier for the client.
         * @type {string}
         */
        const clientId = uuidv4();

        if (!this.rooms.has(roomId)) {
          this.rooms.set(roomId, new Map());
        }

        // Add client to the map
        this.rooms.get(roomId).set(clientId, ws);

        console.log(
          `Client ${clientId} has connected to ${roomId} online fleet room`
        );

        ws.isAlive = true;

        ws.on("pong", () => {
          ws.isAlive = true;
        });

        ws.on("close", () => {
          const room = this.rooms.get(roomId);
          if (room) {
            room.delete(clientId);
            console.log(
              `Client ${clientId} has disconnected from room ${roomId}`
            );

            if (room.size === 0) {
              this.rooms.delete(roomId);
            }
            return;
          } else {
            console.log(`Room ${roomId} does not exist.`);
          }
        });

        // Send a welcome message to the client
        ws.send(`Welcome to the "${roomId}" online fleet room`);
      });

      // Set up ping-pong mechanism
      this.setupPingPong();

      WebSocket.instance = this;
    }

    return WebSocket.instance;
  }

  /**
   * Broadcasts a message to all connected clients.
   * @param {string} message - The message to broadcast.
   * @param {string} roomId - The ID of the chat room.
   * @param {string} created - The timestamp when the message was created.
   */
  broadcast(message, roomId, created) {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.log(`Room ${roomId} does not exist, cannot broadcast message.`);
      return;
    }
    room.forEach((client) => {
      client.send(message);
    });
  }
  
  
  /**
   * Initialize the WebSocket server to listen for Kafka messages.
   */
  async initKafkaConsumer() {
    const kafkaInstance = new KafkaSingleton();
    await kafkaInstance.init();
    kafkaInstance.getConsumer('fleet');
    kafkaInstance.on('message', ({ topic, message }) => {
      const { roomId, created, ...rest } = JSON.parse(message);
        this.broadcast(message, roomId);
    });
  }

  /**
   * Set up the ping-pong mechanism to keep connections alive.
   */
  setupPingPong() {
    const interval = setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (!ws.isAlive) {
          return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
      });
    }, 15000); // Ping every 15 seconds

    this.wss.on("close", () => {
      clearInterval(interval);
    });
  }
}

module.exports = { WebSocket };