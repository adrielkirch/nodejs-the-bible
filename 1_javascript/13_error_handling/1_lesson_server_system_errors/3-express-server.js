const express = require("express");
const http = require("http");

async function startServer(port) {
  const app = express();

  // Define routes and middleware here...

  const server = http.createServer(app);

  // Start the server
  try {
    await new Promise((resolve, reject) => {
      server.listen(port, resolve);
      server.on("error", reject);
    });
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error(`Error starting server:`, error.message || error);
    // Optionally handle error here, e.g., attempt to restart server
  } finally {
    // Cleanup or finalization logic
    console.log(`Server startup process completed.`);
    // Close any resources, release connections, etc.
    // Example: Close database connections
    // await db.close();
    // Example: Release file handles
    // await file.close();
  }

  // Global error handlers
  process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection:`, error.message || error);
    // Optionally handle unhandled rejections here
  });

  process.on("uncaughtException", (error) => {
    console.error(`Uncaught Exception:`, error.message || error);
    // Optionally handle uncaught exceptions here
  });
}

// Example usage:
startServer(3000);
