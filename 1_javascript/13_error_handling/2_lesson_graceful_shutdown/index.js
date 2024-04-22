const { MongoClient } = require("mongodb");
const { createServer } = require("http");
const { promisify } = require("util");

// MongoDB connection URI
const uri = "mongodb://localhost:27017/development";

// Graceful shutdown in Node.js servers refers to the process of gracefully stopping the server and closing existing connections before shutting down the application.
// It ensures that ongoing requests are allowed to finish processing, preventing data loss or abrupt termination of client connections.

/**
 * Establishes a connection to the MongoDB database.
 * @returns {Promise<{ collections: { heroes: Collection }, client: MongoClient }>}
 * A Promise resolving to an object containing database collections and the MongoClient instance.
 */
async function dbConnect() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("MongoDB connected!");

    const db = client.db("comics");

    return {
      collections: { heroes: db.collection("heroes") },
      client,
    };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

/**
 * Handles incoming HTTP requests.
 * @param {http.IncomingMessage} request The HTTP request object.
 * @param {http.ServerResponse} response The HTTP response object.
 */
async function handler(request, response) {
  const { collections, client } = await dbConnect();

  for await (const data of request) {
    try {
      const hero = JSON.parse(data);

      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      });

      const heroes = await collections.heroes.find().toArray();

      response.writeHead(200);
      response.write(JSON.stringify(heroes));
    } catch (error) {
      console.log("An error occurred during request processing:", error);
      response.writeHead(500);
      response.write(JSON.stringify({ message: "Internal server error!" }));
    } finally {
      response.end();
    }
  }
}

// Creates an HTTP server and starts listening on port 3000
const server = createServer(handler).listen(3000, () =>
  console.log(`Server running at port 3000. Process ID: ${process.pid}`)
);

/**
 * Gracefully shuts down the server and closes the MongoDB connection on receiving a signal.
 * @param {string} event The signal received (SIGINT or SIGTERM).
 */
const onStop = async (event) => {
  console.info(`\nReceived ${event} signal.`);

  console.log(`Closing HTTP server...`);
  await promisify(server.close.bind(server))();
  console.log(`HTTP server closed.`);

  if (client) {
    console.log(`Closing MongoDB connection...`);
    await client.close(true); // Forces the shutdown
    console.log(`MongoDB connection closed.`);
  }

  /**
   * Exits the process with status code:
   * 0 - All operations completed successfully.
   * 1 - An error occurred during execution.
   */
  process.exit(0);
};

// Handles SIGINT and SIGTERM signals for graceful shutdown
["SIGINT", "SIGTERM"].forEach((event) => process.on(event, onStop));
