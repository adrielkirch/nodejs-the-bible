const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/route.user");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { PORT } = require("./config");

// npx prisma init
// npx prisma migrate dev

/**
 * Lesson Objective: Implementing a layered architecture with a postgres database + ORM Prisma to do basic operations.
 * With all necessary processes to guarantee security, organization, readability, maintainability, and test-driven development.
 * This async server is built using Express.js, a web application framework for Node.js.
 * It provides a simple and minimalist web server that can handle HTTP requests.
 * @summary Express server for handling HTTP requests and responses.
 * @description This server aims to implement step by step for a Layered architecture with a postgres database + ORM Prisma database for simulating authentication.
 * @since 1.0.0
 * @see {@link http://localhost:3000/api-docs API Documentation}
 * @returns {Promise<void>} A Promise that resolves when the server has started successfully.
 */
async function startServer() {
  const app = express();

  app.use(bodyParser.json());

  // Set up user Route
  app.use("/user", userRoute);

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // Create a PostgreSQL connection pool
  try {
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation: http://localhost:${PORT}/api-docs`);
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1); // Exit the process with an error code
  }
}

startServer();
