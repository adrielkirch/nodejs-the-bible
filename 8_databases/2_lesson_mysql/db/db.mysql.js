const mysql = require("mysql2");
const {
  MYSQL_DATABASE,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_USER,
} = require("../config");
// MySQL database connection configuration
const conn = mysql.createPool({
  connectionLimit: 10,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

// Connect to the MySQL server
conn.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database successfully");

  // Check if the "Users" table exists
  connection.query("SHOW TABLES LIKE 'Users'", (err, results) => {
    if (err) {
      console.error("Error checking if table exists:", err);
      connection.release(); // Release the connection
      return;
    }

    if (results.length === 0) {
      // Table does not exist, create it
      const createTableQuery = `
        CREATE TABLE Users (
          _id VARCHAR(36) PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("Users table created successfully");
        }
        connection.release();
      });
    }
  });
});

module.exports = conn;
