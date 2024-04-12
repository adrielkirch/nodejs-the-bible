const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes");
const { PORT } = require("./config");
//Calling SecurityTools library
const SecurityTools = require("@adrielkirch/security-basic-tools"); 

/**
 * Lesson Objective: Implementing a simple server to test adriel's security package.
 * With all necessary processes to guarantee security, organization, readability, maintainability and test-driven development.
 * This async server is built using Express.js, a web application framework for Node.js.
 * It provides a simple and minimalist web server that can handle HTTP requests.
 * @summary Express server for handling HTTP requests and responses.
 * @description Implementing a simple server to test adriel's security package.
 * @since 1.0.0
 * @see {@link http://localhost:3000/api-docs API Documentation}
 * @returns {Promise<void>} A Promise that resolves when the server has started successfully.
 */
async function startServer() {
  const app = express();

  //Add cors middleware from "SecurityTools"
  const corsMiddleware = SecurityTools.corsMiddleware();
  app.use(corsMiddleware);
  app.use(bodyParser.json());
  app.use("/user", userRoute);

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
}

startServer();
