const { v4: uuidv4 } = require("uuid");
const redisClient = require("../db/db.redis");


async function signup(email, name, password) {
  const userId = uuidv4();
  console.log("userId => ", userId);
  const newUser = { email, name, password, _id: userId };
  const result = await redisClient.set(userId, JSON.stringify(newUser));
  return newUser;
}

async function login(email, password) {
  // Implement logic to find and return user from Redis based on email
  // Example: const user = await findUserByEmail(email);
  return user;
}

async function getById(id) {
  // Retrieve user data from Redis using UUID key
  const userData = await redisClient.get(id);
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null;
  }
}

async function deleteById(id) {
  await redisClient.del(id);
}

async function update(user) {
  // Update user data in Redis using UUID key
  await redisClient.set(user._id, JSON.stringify(user));
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,

  update,
};
