const { Pool } = require("pg");
const {
  POSTGRES_DATABASE,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_USER,
} = require("../config");

// PostgreSQL database connection configuration
const pool = new Pool({
  connectionString: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DATABASE}`,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const queriesInitialize = [
  'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
  "SELECT to_regclass('users')",
  `
  CREATE TABLE IF NOT EXISTS users (
    _id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  )
  `,
];

// Connect to the PostgreSQL database
pool.connect(async (err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    return;
  }
  console.log("Connected to PostgreSQL database successfully");

  try {
    for (const query of queriesInitialize) {
      const result = await client.query(query);
      if (query.startsWith("SELECT")) {
        // Check if the "users" table exists
        if (!result.rows[0].to_regclass) {
          console.log("Users table does not exist");
        } else {
          console.log("Users table already exists");
        }
        return;
      } 
        console.log("Query executed successfully");
      
    }
  } catch (error) {
    console.error("Error executing queries:", error);
  } finally {
    release();
  }
});

module.exports = pool;
