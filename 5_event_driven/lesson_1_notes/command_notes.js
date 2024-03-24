const readline = require("readline");
const EventEmitter = require("events");
const chalk = require("chalk");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Represents a Note Manager that allows users to manage notes.
 * @class NoteManager
 * @extends EventEmitter
 */
class NoteManager extends EventEmitter {
  constructor() {
    super();
    this.notes = [];
  }

  /**
   * Add a new note to the list of notes.
   * @param {string} note - The note to be added.
   * @emits NoteManager#noteAdded
   */
  addNote(note) {
    this.notes.push(note);
    this.emit("noteAdded", note);
  }

  /**
   * Get all the notes stored in the manager.
   * @returns {string[]} Array of notes.
   */
  viewAllNotes() {
    return this.notes;
  }

  /**
   * Delete a note at a specific index.
   * @param {number} index - The index of the note to be deleted.
   * @emits NoteManager#noteDeleted
   */
  deleteNoteAtIndex(index) {
    if (index >= 0 && index < this.notes.length) {
      const deletedNote = this.notes.splice(index, 1)[0];
      this.emit("noteDeleted", deletedNote);
    }
  }
}

/**
 * Represents a graphical user interface (GUI) for the NoteManager application.
 * @class NoteManagerGUI
 */
class NoteManagerGUI {
  constructor() {
    this.emitter = new EventEmitter();
    this.manager = new NoteManager();

    // Event listeners
    this.emitter.on("addNotePrompt", () => {
      this.addNotePrompt();
    });

    this.emitter.on("askMenuOptions", () => {
      this.askMenuOptions();
    });

    this.emitter.on("viewAllNotes", () => {
      this.viewAllNotes(this.manager.viewAllNotes());
      this.askMenuOptions();
    });

    this.emitter.on("welcomeMessage", () => {
      this.welcomeMessage();
      this.emitter.emit("askMenuOptions");
    });

    this.emitter.on("deleteNote", () => {
      this.deleteNote();
    });
  }

  /**
   * Display a welcome message to the user.
   */
  welcomeMessage() {
    console.log(chalk.green.bold("Welcome to Note Manager!"));
    console.log(chalk.cyan.bold("Manage your notes efficiently."));
  }

  /**
   * Display all the notes stored in the manager.
   * @param {string[]} notes - Array of notes to be displayed.
   */
  viewAllNotes(notes) {
    console.log(chalk.cyan.bold("\nAll Notes:\n"));
    notes.forEach((note, index) => {
      console.log(chalk.white.bold(`${index + 1}. ${note}`));
    });
  }

  /**
   * Prompt the user to enter a new note and add it to the manager.
   */
  addNotePrompt() {
    rl.question(chalk.yellow.bold("Enter the new note: "), (note) => {
      this.manager.addNote(note);
      this.emitter.emit("askMenuOptions");
    });
  }

  /**
   * Display a menu of options to the user and prompt for their choice.
   */
  askMenuOptions() {
    rl.question(
      chalk.white.bold(`
      ${chalk.yellow.bold("Select an option:\n")}
      1 - Add a new note
      2 - See all notes
      3 - Delete a note
      4 - Exit
      ${chalk.yellow.bold("\nEnter your choice:\n")} `),
      (choice) => {
        switch (choice) {
          case "1":
            this.emitter.emit("addNotePrompt");
            break;
          case "2":
            this.emitter.emit("viewAllNotes");
            break;
          case "3":
            this.emitter.emit("deleteNote");
            break;
          case "4":
            console.log(chalk.cyan.bold(`Exiting...`));
            rl.close();
            break;
          default:
            console.log(
              chalk.red.bold(`Invalid choice. Please enter a valid option.`)
            );
            this.emitter.emit("askMenuOptions");
            break;
        }
      }
    );
  }

  /**
   * Prompt the user to enter the index of the note to be deleted and delete it.
   */
  deleteNote() {
    rl.question(
      chalk.yellow.bold("Enter the index of the note to delete: "),
      (index) => {
        this.manager.deleteNoteAtIndex(parseInt(index) - 1);
        this.emitter.emit("askMenuOptions");
      }
    );
  }

  /**
   * Start the Note Manager application by displaying the welcome message and menu options.
   */
  start() {
    this.emitter.emit("welcomeMessage");
  }
}

// Create an instance of NoteManagerGUI and start the application
const gui = new NoteManagerGUI();
gui.start();
