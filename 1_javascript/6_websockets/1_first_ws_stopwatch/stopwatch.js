/**
 * Class representing a Stopwatch.
 * 
 * The Stopwatch class provides functionality to manage a stopwatch timer,
 * including starting, stopping, resetting, and formatting time.
 */
class Stopwatch {
    /**
     * Create a new Stopwatch.
     * @param {Function} broadcastTime - The function to broadcast time to clients.
     */
    constructor(broadcastTime) {

      this.timerId = null; // Timer ID for the setInterval function
      this.elapsedTime = 0; // Elapsed time in seconds
      this.clients = new Set(); // Set to store connected clients
      this.broadcastTime = broadcastTime; // Function to broadcast time to clients
    }
  
    /**
     * Format the elapsed time into a human-readable string (MM:SS).
     * @param {number} elapsedTime - The elapsed time in seconds.
     * @returns {string} The formatted time string (MM:SS).
     */
    formatTime(elapsedTime) {
      const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
      const seconds = (elapsedTime % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    }
  
    /**
     * Start the stopwatch timer.
     * Increments the elapsed time every second and broadcasts the updated time to clients.
     */
    startStopwatch() {
      const updateElapsedTime = () => {
        this.elapsedTime += 1;
        this.broadcastTime();
        this.timerId = setTimeout(updateElapsedTime, 1000);
      };
      updateElapsedTime();
    }
  
    /**
     * Stop the stopwatch timer.
     * Clears the interval timer.
     */
    stopStopwatch() {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  
    /**
     * Reset the stopwatch timer.
     * Stops the timer, resets the elapsed time to 0, and broadcasts the reset time to clients.
     */
    resetStopwatch() {
      this.stopStopwatch();
      this.elapsedTime = 0;
      this.broadcastTime();
    }
  
    /**
     * Handle incoming messages from clients.
     * Parses the message and performs corresponding actions (start, stop, reset).
     * @param {string} message - The message received from a client.
     */
    handleMessage(message) {
      console.log("Received message:", message);
      switch (message) {
        case "start":
          this.startStopwatch();
          break;
        case "stop":
          this.stopStopwatch();
          break;
        case "reset":
          this.resetStopwatch();
          break;
        default:
          console.log("Unknown command received:", message);
      }
    }
  }
  
  module.exports = {
    Stopwatch
  }
  