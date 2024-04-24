const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("./db");

const Task = require("./task");
// Create an Express application
const app = express();

// Define port number
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Define route handler for the root endpoint
app.get("/", (req, res) => {
  res.status(200).send(`Hello, you are in ${process.env.NODE_ENV} environment`);
});

/**
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title": "Task Title", "description": "Task Description"}' \
  http://localhost:3000/task
 */
app.post("/task", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Couldn't save model" });
  }
});

// curl http://localhost:3000/task
app.get("/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Couldn't fetch tasks" });
  }
});

// Define route handler for all other endpoints
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
