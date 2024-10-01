const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const fleetRoute = require("./route");
const { PORT } = require("./config");
const { KafkaSingleton } = require("./kafka");
const http = require("http");
const { WebSocket } = require("./ws");

/**
 * Lesson Objective: Implementing a  layered architecture with a fake JSON database to simulate authentication.
 * With all necessary processes to guarantee security, organization, readability, maintainability and test-driven development.
 * This async server is built using Express.js, a web application framework for Node.js.
 * It provides a simple and minimalist web server that can handle HTTP requests.
 * @summary Express server for handling HTTP requests and responses.
 * @description This server aims to implement step by step for a Layered architecture with a fake JSON database for simulating authentication.
 * @since 1.0.0
 * @see {@link http://localhost:3000/api-docs API Documentation}
 * @returns {Promise<void>} A Promise that resolves when the server has started successfully.
 */
async function startServer() {
  const app = express();
  app.use(bodyParser.json());

  //Set up user Route
  app.use("/fleet", fleetRoute);
  const server = http.createServer(app);
  const ws = new WebSocket(server); 
  await app.listen(PORT);
  const kafkaInstance = new KafkaSingleton();
  await kafkaInstance.init();

  console.log(`Server is running on port ${PORT}`);

  server.listen(PORT + 1, () => {
    console.log(`Service socket is listening on ${PORT + 1}`);
  });
  
}

startServer();
