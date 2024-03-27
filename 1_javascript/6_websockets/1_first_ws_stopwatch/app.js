const express = require("express");
const cors = require("cors");
const { websocket } = require("./ws");
const http = require("http");

/**
 * Sever express
 */
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("Welcome to Stop watch websocket");
});

const server = http.createServer(app);
websocket(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Service socket is listening on ${port}`);
});
