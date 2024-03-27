const readline = require("readline");
const EventEmitter = require("events");
const chalk = require("chalk");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Represents a Task Scheduler that allows users to schedule tasks.
 * @class TaskScheduler
 * @extends EventEmitter
 */
class TaskScheduler extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }

  /**
   * Add a new task to the list of tasks and schedule it.
   * @param {Object} task - The task to be added.
   * @param {string} task.name - The name of the task.
   * @param {number} task.seconds - The time after which the task should be triggered (in seconds).
   * @emits TaskScheduler#taskAdded
   */
  addTask(task) {
    this.tasks.push(task);
    this.emit("taskAdded", task);
    this.scheduleTask(task);
  }

  /**
   * Schedule a task to be triggered after a certain number of seconds.
   * @param {Object} task - The task to be scheduled.
   * @param {string} task.name - The name of the task.
   * @param {number} task.seconds - The time after which the task should be triggered (in seconds).
   */
  scheduleTask(task) {
    console.log(
      chalk.cyan.bold(
        `\nTask "${task.name}" will be triggered in ${task.seconds} seconds.\n`
      )
    );
    setTimeout(() => {
      console.log(chalk.green.bold(`\nTask "${task.name}" is done!\n`));
    }, task.seconds * 1000);
  }

  /**
   * Get all the tasks stored in the scheduler.
   * @returns {Object[]} Array of tasks.
   */
  getAllTasks() {
    return this.tasks;
  }
}

/**
 * Represents a graphical user interface (GUI) for the TaskScheduler application.
 * @class TaskSchedulerGUI
 */
class TaskSchedulerGUI {
  constructor() {
    this.emitter = new EventEmitter();
    this.scheduler = new TaskScheduler();

    // Event listeners
    this.emitter.on("addTaskPrompt", () => {
      this.addTaskPrompt();
    });

    this.emitter.on("askMenuOptions", () => {
      this.askMenuOptions();
    });

    this.emitter.on("viewAllTasks", () => {
      this.viewAllTasks(this.scheduler.getAllTasks());
      this.askMenuOptions();
    });

    this.emitter.on("welcomeMessage", () => {
      this.welcomeMessage();
      this.emitter.emit("askMenuOptions");
    });
  }

  /**
   * Display a welcome message to the user.
   */
  welcomeMessage() {
    console.log(chalk.green.bold("Welcome to Task Scheduler!"));
    console.log(chalk.cyan.bold("Don't miss a task with reminders."));
  }

  /**
   * Display all the tasks stored in the scheduler.
   * @param {Object[]} tasks - Array of tasks to be displayed.
   */
  viewAllTasks(tasks) {
    console.log(chalk.cyan.bold("All Scheduled Tasks:\n"));
    tasks.forEach((task, index) => {
      console.log(
        chalk.white.bold(
          `${index + 1}. ${task.name} - Trigger after ${task.seconds} seconds`
        )
      );
    });
  }

  /**
   * Prompt the user to enter details of a new task and add it to the scheduler.
   */
  addTaskPrompt() {
    rl.question(chalk.yellow.bold("Enter the name of the task: "), (name) => {
      rl.question(
        chalk.yellow.bold(
          "Enter the time after which it should be triggered (in seconds): "
        ),
        (seconds) => {
          this.scheduler.addTask({ name, seconds: parseInt(seconds) });
          this.emitter.emit("askMenuOptions");
        }
      );
    });
  }

  /**
   * Display a menu of options to the user and prompt for their choice.
   */
  askMenuOptions() {
    rl.question(
      chalk.white.bold(`
    ${chalk.yellow.bold("Select an option:\n")}
    1 - Add task
    2 - See all schedule tasks
    3 - Exit
    ${chalk.yellow.bold("\nEnter your choice:\n")} `),
      (choice) => {
        switch (choice) {
          case "1":
            this.emitter.emit("addTaskPrompt");
            break;
          case "2":
            this.emitter.emit("viewAllTasks");
            break;
          case "3":
            console.log(chalk.cyan.bold(`Exiting...`));
            rl.close();
            break;
          default:
            console.log(
              chalk.red.bold(`Invalid choice. Please enter 1, 2, or 3.`)
            );
            this.emitter.emit("askMenuOptions");
            break;
        }
      }
    );
  }

  /**
   * Start the Task Scheduler application by displaying the welcome message and menu options.
   */
  start() {
    this.emitter.emit("welcomeMessage");
  }
}

// Create an instance of TaskSchedulerGUI and start the application
const gui = new TaskSchedulerGUI();
gui.start();
