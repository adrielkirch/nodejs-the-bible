const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { JWT_SECRET_KEY } = require("../config");
const { v4: uuidv4 } = require("uuid");

function generateUUID() {
  return uuidv4();
}

function generateJwt(userId) {
  const payload = { user: userId };
  const token = jwt.sign(payload, JWT_SECRET_KEY);
  return token;
}

function decodedJwt(token) {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  return decoded.user;
}

function generateHashWithSalt(data) {
  return crypto
    .createHash("sha512")
    .update(data + process.env.SALT)
    .digest("hex");
}

function generateHashDigitalSignature(data) {
  return crypto
    .createHash("sha512")
    .update(data + new Date() + genRandomBytes(64))
    .digest("hex");
}

function genRandomBytes(len) {
  const buf = crypto.randomBytes(len);
  return buf.toString("hex");
}

function removeSensitiveProperty(data, field) {
  Reflect.deleteProperty(data,field);
  return data;
}

module.exports = {
  generateUUID,
  generateJwt,
  generateHashWithSalt,
  generateHashDigitalSignature,
  decodedJwt,
  removeSensitiveProperty,
};
