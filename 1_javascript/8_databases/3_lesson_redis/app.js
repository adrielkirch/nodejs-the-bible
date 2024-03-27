
const dotenv = require("dotenv");
dotenv.config();
const redisClient = require('./db/db.redis');
const express = require("express");
const bodyParser = require("body-parser");
const placeRoute = require("./routes/route.place");
const { PORT } = require("./config");

async function startServer() {
 
  const app = express();

  app.use(bodyParser.json());

  app.use("/place", placeRoute);

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
}

startServer();
