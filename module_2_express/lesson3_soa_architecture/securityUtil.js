const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const secretJwt = process.env.JWT_SECRET_KEY;
const secretJwt = 'd8b9a69fb25bcaa6c524acccfe7a1d22a6bf64aa96974bb4c9b26234452465bd'
console.log("secretJwt -->",secretJwt)
const { v4: uuidv4 } = require("uuid");

function generateUUID() {
  return uuidv4();
}

function generateJwt(userId) {
  const payload = { user: userId };
  const token = jwt.sign(payload, secretJwt);
  return token;
}

function decodedJwt(token) {
  const decoded = jwt.verify(token, secretJwt);
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

function removeSensiviteProperty(data, field) {
  delete data[field];
  return data;
}

module.exports = {
  generateUUID,
  generateJwt,
  generateHashWithSalt,
  generateHashDigitalSignature,
  decodedJwt,
  removeSensiviteProperty,
};
