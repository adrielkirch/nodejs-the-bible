const userRepository = require("../repositories/repository.user");
const securityUtil = require("../utils/util.security");

async function signup(email, name, password) {
  
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
  user = user.toObject();
  const token = securityUtil.generateJwt(user._id.toString());
  user.token = token;
  user = securityUtil.removeSensitiveProperty(user, "password");
  return {
    _id: user._id,
    token: token
  };
}

async function getById(id) {
  let user = await userRepository.getById(id);
  if (!user) {
    throw new Error("Invalid Id");
  }
  user = user.toObject();
  user = securityUtil.removeSensitiveProperty(user, "password");
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
  const user = await userRepository.getById(newUser._id);
  if (!user) {
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
