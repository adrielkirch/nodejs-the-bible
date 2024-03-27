const conn = require("../db/db.mysql");
const { v4: uuidv4 } = require("uuid");

async function signup(email, name, password) {
  try {
    const newUser = {
      _id: uuidv4(),
      email,
      name,
      password,
    };

    const promiseConnection = conn.promise();
    const insertQuery = "INSERT INTO Users SET ?";
    const result = await promiseConnection.query(insertQuery, newUser);
    return newUser;
  } catch (error) {
    console.error("Error occurred during signup:", error);
    throw error;
  }
}
async function login(email, password) {
  try {
    const promiseConnection = conn.promise();
    const selectQuery = "SELECT * FROM Users WHERE email = ? AND password = ?";
    const [rows] = await promiseConnection.query(selectQuery, [
      email,
      password,
    ]);
    return rows[0];
  } catch {
    return null;
  }
}

async function getById(id) {
  try {
    const promiseConnection = conn.promise();
    const selectQuery = "SELECT * FROM Users WHERE _id = ?";
    const [rows] = await promiseConnection.query(selectQuery, id);
    return rows[0];
  } catch {
    return null;
  }
}

async function deleteById(id) {
  try {
    const promiseConnection = conn.promise();
    const deleteQuery = "DELETE FROM Users WHERE _id = ?";
    await conn.promiseConnection(deleteQuery, id);
  } catch {
    return null;
  }
}

async function getByFieldValue(field, value) {
  try {
    const promiseConnection = conn.promise();
    const selectQuery = `SELECT * FROM Users WHERE ${field} = ?`;
    const [rows] = await promiseConnection.query(selectQuery, [value]);
    return rows;
  } catch {
    return null;
  }
}

async function update(user) {
  const promiseConnection = conn.promise();
  const updateQuery = "UPDATE Users SET email = ?, name = ? WHERE _id = ?";
  await promiseConnection.query(updateQuery, [
    user.email,
    user.name,
    user.password,
    user._id,
  ]);
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  getByFieldValue,
  update,
};
