const { parentPort, workerData } = require("worker_threads");

// Simulate some heavy computation or processing
const result = computeResult(workerData.requestUrl);

// Send the result back to the main thread
parentPort.postMessage(result);

// Function to compute the result
function computeResult(requestUrl) {

  if (Math.random() < 0.1) {
    // Adjust the probability as needed
    throw new Error("Intentional error occurred");
  } else if (Math.random() < 0.05) {
    process.exit(1);
  } else {
    return `Result for URL: ${requestUrl}`;
  }
 
}
