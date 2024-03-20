const fs = require("fs");
const path = require("path");

async function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function writeFileAsync(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function getDbPath() {
  return path.join(__dirname, "db.json");
}

module.exports = {
  readFileAsync,
  writeFileAsync,
  getDbPath,
};
