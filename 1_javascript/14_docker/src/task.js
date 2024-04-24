const mongoose = require("mongoose");

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
