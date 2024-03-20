const userRepository = require("./repository");
const securityUtil = require("./securityUtil");

async function signup(email, name, password) {
  const exists = await userRepository.getByFieldValue("email", email);
  if (exists) {
    throw new Error("E-mail not available");
  }
  const hashPassword = securityUtil.generateHashWithSalt(password);
  const user = await userRepository.signup(email, name, hashPassword);
  return user;
}

async function login(email, password) {
  const hashPassword = securityUtil.generateHashWithSalt(password);
  let user = await userRepository.login(email, hashPassword);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const token = securityUtil.generateJwt(user._id.toString());
  user.token = token;
  user = securityUtil.removeSensiviteProperty(user, "password");
  return user;
}

async function getById(id) {
  let user = await userRepository.getById(id);
  if (!user) {
    throw new Error("Invalid Id");
  }
  user = securityUtil.removeSensiviteProperty(user, "password");
  return user;
}

async function deleteById(id) {
  const exists = await userRepository.getById(id);
  if (!exists) {
    throw new Error("Invalid Id");
  }
  await userRepository.deleteById(id);
}

async function update(newUser) {
  const exists = await userRepository.getById(newUser._id);
  if (!exists) {
    throw new Error("Invalid Id");
  }
  await userRepository.update(newUser);
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  update,
};
