const express = require("express");
const cors = require("cors");
const { WebSocket } = require("./ws");
const http = require("http");

/**
 * Server express
 */
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("Welcome to Stop watch websocket");
});

const server = http.createServer(app);
const ws = new WebSocket(server); 
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Service socket is listening on ${port}`);
});
