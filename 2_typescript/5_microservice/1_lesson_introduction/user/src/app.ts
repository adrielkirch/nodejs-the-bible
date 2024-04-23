import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { UserRouter } from "./routes/route.user";
import { PORT } from "./config";
import MongoDb from "./db/db.mongo";


async function startServer(): Promise<void> {
  const userRouter: UserRouter = new UserRouter();
  const app = express();
  // await MongoDb.connect();
  app.use(bodyParser.json());
  //Setup root route 
  app.get('/', (req, res) => {
    res.send('Welcome to the microservice!');
  });
  // Set up user Route
  // app.use("/user", userRouter.createRoutes());
  

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
}

startServer();
