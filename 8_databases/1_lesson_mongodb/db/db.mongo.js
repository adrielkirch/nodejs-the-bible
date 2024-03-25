/*
MongoDB Connection Setup

1. Install MongoDB Server:
   - Follow the installation instructions for your operating system.
   - For Linux:
     ```
     sudo apt update
     sudo apt install mongodb
     ```
   - For macOS:
     ```
     brew tap mongodb/brew
     brew install mongodb-community
     ```
   - For Windows:
     - Download the MongoDB installer from the official MongoDB website.
     - Run the installer and follow the installation instructions.

2. Configure MongoDB to Run on Port 27017:
   - Locate the MongoDB configuration file (e.g., /etc/mongod.conf on Linux/macOS).
   - Open the configuration file with a text editor.
   - Set the 'port' option to '27017' in the 'net' section.
   - Save the configuration file and restart the MongoDB service.

3. Create a Database Named "development":
   - Open a terminal or command prompt.
   - Launch the MongoDB shell by typing 'mongo'.
   - Switch to the 'development' database by typing 'use development'.

4. Verify MongoDB Installation and Database Creation:
   - Launch the MongoDB shell by typing 'mongo'.
   - List all databases by typing 'show dbs'.
   - Verify that the 'development' database is listed.

*/

const mongoose = require('mongoose');
const { MONGO_URI } = require("../config");

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(error => console.error('Error connecting to MongoDB:', error));


module.exports = mongoose;
