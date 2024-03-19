const fileUtil = require("./fileUtil");
const securityUtil = require("./securityUtil");
const dbPath = fileUtil.getDbPath();

async function signup(email, name, password) {
  const db = await fileUtil.readFileAsync(dbPath);
  const newUser = {
    _id: securityUtil.generateUUID(),
    email: email,
    name: name,
    password: password,
  };
  db.users.push(newUser);
  await fileUtil.writeFileAsync(dbPath, db);
  return newUser;
}

async function login(email, password) {
  const db = await fileUtil.readFileAsync(dbPath);
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  return user;
}

async function getById(id) {
  const db = await fileUtil.readFileAsync(dbPath);
  const user = db.users.find((u) => u._id === id);
  return user;
}

async function deleteById(id) {
  const db = await fileUtil.readFileAsync(dbPath);
  const index = db.users.findIndex((u) => u._id === id);
  db.users.splice(index, 1);
  await fileUtil.writeFileAsync(dbPath, db);
}

async function getByFieldValue(field, value) {
  const db = await fileUtil.readFileAsync(dbPath);
  const user = db.users.find((u) => u[field] === value);
  return user;
}

async function update(user) {
  const db = await fileUtil.readFileAsync(dbPath);
  const index = db.users.findIndex((u) => u._id === user._id);
  db.users[index].name = user.name;
  await fileUtil.writeFileAsync(dbPath, db);
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  getByFieldValue,
  update,
};
