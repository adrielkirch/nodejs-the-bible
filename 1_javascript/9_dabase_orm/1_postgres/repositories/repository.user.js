const pool = require("../db/db.postgres");
const { v4: uuidv4 } = require("uuid");

async function signup(email, name, password) {
  try {
    const newUser = {
      _id: uuidv4(),
      email,
      name,
      password,
    };

    const client = await pool.connect();
    const insertQuery =
      "INSERT INTO users (_id, email, name, password) VALUES ($1, $2, $3, $4)";
    await client.query(insertQuery, [
      newUser._id,
      newUser.email,
      newUser.name,
      newUser.password,
    ]);
    client.release(); // Release the client back to the pool
    return newUser;
  } catch (error) {
    console.error("Error occurred during signup:", error);
    throw error;
  }
}

async function login(email, password) {
  try {
    const client = await pool.connect();
    const selectQuery =
      "SELECT * FROM users WHERE email = $1 AND password = $2";
    const { rows } = await client.query(selectQuery, [email, password]);
    client.release(); // Release the client back to the pool
    return rows[0];
  } catch (error) {
    console.error("Error occurred during login:", error);
    return null;
  }
}

async function getById(id) {
  try {
    const client = await pool.connect();
    const selectQuery = "SELECT * FROM users WHERE _id = $1";
    const { rows } = await client.query(selectQuery, [id]);
    client.release(); // Release the client back to the pool
    return rows[0];
  } catch (error) {
    console.error("Error occurred while fetching user by ID:", error);
    return null;
  }
}

async function deleteById(id) {
  try {
    const client = await pool.connect();
    const deleteQuery = "DELETE FROM users WHERE _id = $1";
    await client.query(deleteQuery, [id]);
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Error occurred while deleting user by ID:", error);
    return null;
  }
}

async function getByFieldValue(field, value) {
  try {
    const client = await pool.connect();
    const selectQuery = `SELECT * FROM users WHERE ${field} = $1`;
    const { rows } = await client.query(selectQuery, [value]);
    client.release(); // Release the client back to the pool
    console.log("Query executed successfully.");
    return rows;
  } catch (error) {
    console.error("Error occurred while fetching user by field value:", error);
    return null;
  }
}

async function update(user) {
  try {
    const client = await pool.connect();
    const updateQuery =
      "UPDATE users SET name = $1, password = $2 WHERE _id = $3";
    await client.query(updateQuery, [
      user.name,
      user.password,
      user._id,
    ]);
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Error occurred while updating user:", error);
    return null;
  }
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  getByFieldValue,
  update,
};
