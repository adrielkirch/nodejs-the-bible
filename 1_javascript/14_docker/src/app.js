const express = require("express");

function setEnvByCommandLineParam() {
  if (!process.argv.length) {
    return;
  }
  console.log(`${__dirname}/../.env.development`);
  let env = process.argv[2];

  if (env == "--stagging") {
    require("dotenv").config({ path: `${__dirname}/../.env.stagging` });
  } else if (env == "--production") {
    require("dotenv").config({ path: `${__dirname}/../.env.production` });
  } else {
    require("dotenv").config({ path: `${__dirname}/../.env.development` });
  }
}

// Create an Express application
const app = express();

// Define port number
const PORT = process.env.PORT || 3000;

//Set env file
setEnvByCommandLineParam();

// Define route handler for the root endpoint
app.get("/", (req, res) => {
  res.status(200).send(`Hello, you are in ${process.env.NODE_ENV} environment`);
});

// Define route handler for all other endpoints
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
