"use strict";

/**
 * In this example, we've created a task scheduler using JavaScript timing mechanisms to simulate the execution of asynchronous tasks.
 */
// Sample tasks array
const tasks = [
  { name: "task1", created: Date.now(), schedule: 8000, done: false },
  { name: "task2", created: Date.now(), schedule: 5000, done: false },
  { name: "task3", created: Date.now(), schedule: 3000, done: false },
];

// Function to execute a single task
const executeTask = (task) => {
  // Simulate asynchronous operation
  setTimeout(() => {
    console.log(`Task ${task.name} completed`);
    task.done = true; // Mark task as completed
  }, task.schedule);
};

// Proxy to intercept task completion updates
const taskProxy = new Proxy(tasks, {
  set: (target, propertyKey, newValue) => {
    if (propertyKey === "done" && newValue === true) {
      console.log(`Task ${target.name} is completed.`);
    }
    target[propertyKey] = newValue;
    return true;
  },
});

// Function to schedule and execute tasks
const scheduleTasks = (tasks) => {
  tasks.forEach((task, index) => {
    console.log(`Scheduling task ${task.name}`);
    process.nextTick(()=> {
      if (!task.done) {
        executeTask(taskProxy[index]); // Execute task if not done
      }
    }, task.schedule);
  });
};

// Start scheduling tasks
scheduleTasks(tasks);

//Executing a new task using process.nextTick
process.nextTick(() => {
  const newTask = {
    name: "task4",
    created: Date.now(),
    schedule: 1000,
    done: false,
  };
  tasks.push(newTask);
  executeTask(newTask);
});
console.log("\n\n****** Task Done ******\n\n")