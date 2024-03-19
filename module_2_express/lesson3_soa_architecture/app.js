const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoute = require("./route");
const swaggerUI = require("swagger-ui-express");

dotenv.config();

/**
 * Lesson Objective: Implementing a Service-Oriented Architecture (SOA), layered architecture with a fake JSON database to simulate authentication,
 * with all necessary processes to guarantee security, organization, readability, maintainability, test-driven.
 * This async server is built using Express.js, a web application framework for Node.js.
 * It provides a simple and minimalist web server that can handle HTTP requests,
 * define routes, and respond with data or render views.
 * @summary Express server for handling HTTP requests and responses.
 * @description This server is built using Express.js, a web application framework for Node.js, to implement a Service-Oriented Architecture (SOA) with a fake JSON database for simulating authentication.
 * @since 1.0.0
 * @see {@link http://localhost:3000/api-docs API Documentation}
 * @returns {Promise<void>} A Promise that resolves when the server has started successfully.
 */
async function startServer() {
  const app = express();
  const port = process.env.PORT;
  app.use(bodyParser.json());

  //Set up user Route
  app.use("/user", userRoute);


  const swaggerSpec = require("./swagger");
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

startServer();