const userRepository = require("../repositories/repository.user");
const securityUtil = require("../utils/util.security");

async function signup(email, name, password) {
  const data = await userRepository.getByFieldValue("email", email);
  if (!data) {
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

  const token = securityUtil.generateJwt(user.id.toString());
  user.token = token;
  user = securityUtil.removeSensitiveProperty(user, "password");
  return {
    id: user.id,
    token: token,
  };
}

async function getById(id) {
  let user = await userRepository.getById(id);
  if (!user) {
    throw new Error("Invalid Id");
  }

  user = securityUtil.removeSensitiveProperty(user, "password");
  return user;
}

async function deleteById(id) {
  const data = await userRepository.getById(id);
  if (!data) {
    throw new Error("Invalid Id");
  }
  await userRepository.deleteById(id);
}

async function update(newUser) {
  
  const user = await userRepository.getById(newUser.id);


  if (!user) {
    throw new Error("Invalid Id");
  }
 
  if (newUser.password) {
    user.password = securityUtil.generateHashWithSalt(newUser.password);
  }
  if (newUser.name) {
    user.name 
  }

  user.name = newUser.name;

  await userRepository.update(user);
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  update,
};
