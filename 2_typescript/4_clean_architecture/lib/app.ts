import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { UserRouter } from "./infrastructure/routes/route.user";
import { TaskRouter } from "./infrastructure/routes/route.task";
import { CommentRouter } from "./infrastructure/routes/route.comment";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { PORT } from "./config";
import MongoDb from "./infrastructure/databases/database.mongo";
import dependecyInjections from "./dependency-injection";
import Container from "typedi";

/**
 * Lesson Objective: Implementing a clean architecture for a task management mvp system
 * With all necessary processes to guarantee security, organization, readability, maintainability and test-driven development.
 * This async server is built using Express.js, a web application framework for Node.js.
 * It provides a simple and minimalist web server that can handle HTTP requests.
 * @summary Express server for handling HTTP requests and responses.
 * @description This server aims to implement step by step for a clean architecture.
 * @since 1.0.0
 * @see {@link http://localhost:3000/api-docs API Documentation}
 * @returns {Promise<void>} A Promise that resolves when the server has started successfully.
 */
async function startServer(): Promise<void> {
  dependecyInjections();

  const userRouter: UserRouter = Container.get(UserRouter);
  const taskRouter: TaskRouter = Container.get(TaskRouter);
  const commentRouter: CommentRouter = Container.get(CommentRouter);

  const app = express();
  app.use(bodyParser.json());
  app.use("/user", userRouter.createRoutes());
  app.use("/task", taskRouter.createRoutes());
  app.use("/comment", commentRouter.createRoutes());
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  await new MongoDb();
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
}


startServer();
