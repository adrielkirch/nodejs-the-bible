const User = require("../models/model.user");

async function signup(email, name, password) {
  const newUser = new User({ email, name, password });
  await newUser.save();
  return newUser;
}

async function login(email, password) {
  const user = await User.findOne({ email, password });
  return user;
}

async function getById(id) {
  const user = await User.findById(id);
  return user;
}

async function deleteById(id) {
  await User.findByIdAndDelete(id);
}

async function getByFieldValue(field, value) {
  const user = await User.findOne({ [field]: value });
  return user;
}

async function update(user) {
  await User.findByIdAndUpdate(user._id, user);
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  getByFieldValue,
  update,
};
