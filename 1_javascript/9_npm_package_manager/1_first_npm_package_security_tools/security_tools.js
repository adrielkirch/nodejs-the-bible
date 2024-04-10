const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const rateLimit = require("express-rate-limit");

/**
 * A utility class providing various security-related functions.
 * @class
 */
class SecurityTools {
  /**
   * Generates a UUID (Universally Unique Identifier) using version 4.
   * @returns {string} A string representing the generated UUID.
   */
  static generateUUID() {
    return uuidv4();
  }

  /**
   * Generates a JSON Web Token (JWT) for the specified user ID using the provided secret key.
   * @param {string|number} userId - The ID of the user for whom the JWT is being generated.
   * @param {string} secretJwtKey - The secret key used for signing the JWT.
   * @returns {string} A string representing the generated JWT.
   */
  static generateJwt(userId, secretJwtKey) {
    const payload = { user: userId };
    const token = jwt.sign(payload, secretJwtKey);
    return token;
  }

  /**
   * Decodes a JSON Web Token (JWT) to extract the user ID using the provided secret key.
   * @param {string} token - The JWT to decode.
   * @param {string} secretJwtKey - The secret key used for decoding the JWT.
   * @returns {string|number} The ID of the user extracted from the JWT.
   * @throws {Error} If the JWT is invalid or cannot be decoded.
   */
  static decodedJwt(token, secretJwtKey) {
    const decoded = jwt.verify(token, secretJwtKey);
    return decoded.user;
  }

  /**
   * Generates a hash of the provided data combined with the given salt using the SHA-512 hashing algorithm.
   * @param {string} data - The data to hash.
   * @param {string} salt - The salt to add to the data before hashing.
   * @returns {string} The hashed result as a hexadecimal string.
   */
  static generateHashWithSalt(data, salt) {
    return crypto
      .createHash("sha512")
      .update(data + salt)
      .digest("hex");
  }

  /**
   * Generates a hash of the current date and a random string using the SHA-512 hashing algorithm.
   * @returns {string} The hashed result as a hexadecimal string.
   */
  static generateHashDigitalSignature() {
    return crypto
      .createHash("sha512")
      .update(new Date() + this.generateRandomBytes(64))
      .digest("hex");
  }

  /**
   * Generates a random string of bytes with the specified length.
   * @param {number} size - The size of bytes to generate
   * @returns {string} A hexadecimal representation of the generated random bytes.
   */
  static generateRandomBytes(size) {
    const buf = crypto.randomBytes(size);
    return buf.toString("hex");
  }

  /**
   * Generates a random number with the specified number of digits.
   * @param {number} digits - The number of digits for the random number.
   * @returns {string} The generated random number as a string.
   */
  static generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }

  /**
   * Removes a sensitive property from an object.
   * @param {Object} data - The object from which to remove the property.
   * @param {string} property - The name of the property to remove.
   * @returns {Object} The object with the specified property removed.
   */
  static removeSensitiveProperty(data, property) {
    Reflect.deleteProperty(data, property);
    return data;
  }

  /**
   * Removes multiple sensitive properties from an object.
   * @param {Object} data - The object from which to remove the properties.
   * @param {string[]} properties - An array containing the names of the properties to remove.
   * @returns {Object} The object with the specified properties removed.
   */
  static removeSensitiveProperties(data, properties) {
    for (let i = 0; i < properties.length; i++) {
      Reflect.deleteProperty(data, properties[i]);
    }
    return data;
  }

  /**
   * Encrypts the provided data using the AES-256-CBC encryption algorithm.
   * @param {string} data - The data to be encrypted.
   * @param {string} key - The encryption key.
   * @param {Buffer} iv - The initialization vector.
   * @returns {string} The encrypted data as a hexadecimal string.
   */
  static encryptAES(data, key, iv) {
    const derivedKey = crypto.createHash("sha256").update(key).digest();
    const cipher = crypto.createCipheriv("aes-256-cbc", derivedKey, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  /**
   * Decrypts the provided data using the AES-256-CBC encryption algorithm.
   * @param {string} encryptedData - The encrypted data to be decrypted.
   * @param {string} key - The decryption key.
   * @param {Buffer} iv - The initialization vector.
   * @returns {string} The decrypted data.
   */
  static decryptAES(encryptedData, key, iv) {
    const derivedKey = crypto.createHash("sha256").update(key).digest();
    const decipher = crypto.createDecipheriv("aes-256-cbc", derivedKey, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  /**
   * Checks if the provided password meets strong password criteria.
   * @param {string} password - The password to be checked.
   * @returns {boolean} True if the password meets the criteria, otherwise false.
   */
  static isStrongPassword(password) {
    const pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return pattern.test(password);
  }

  /**
   * Creates a rate limiter middleware for HTTP requests based on IP address.
   * @param {number} maximum - The maximum number of requests allowed within the specified time window.
   * @param {number} minutes - The time window in minutes.
   * @param {string} message - The message to send when the limit is exceeded.
   * @param {boolean} defaultLimiter - If true, uses default values for minutes and maximum.
   * @returns {Function} Express middleware function for rate limiting.
   */
  static httpLimiterByIp(maximum, minutes, message, defaultLimiter = false) {
    if (defaultLimiter) {
      minutes = 60;
      maximum = 10;
    }
    return rateLimit({
      windowMs: minutes * 60 * 1000,
      max: maximum,
      standardHeaders: true,
      legacyHeaders: false,
      message: message,
    });
  }

 /**
 * Creates a CORS middleware to handle Cross-Origin Resource Sharing policies.
 * @param {string} origin - The value to set for the Access-Control-Allow-Origin header.
 * @param {string} methods - The value to set for the Access-Control-Allow-Methods header.
 * @param {string} allowedHeaders - The value to set for the Access-Control-Allow-Headers header.
 * @param {boolean} credentials - Whether to allow credentials (Access-Control-Allow-Credentials header).
 * @param {number} optionsSuccessStatus - The status code to send for OPTIONS requests.
 * @returns {Function} Express middleware function for handling CORS.
 */
static corsMiddleware(
    origin = "*", 
    methods = "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders = "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials = true,
    optionsSuccessStatus = 204
  ) {
    return (req, res, next) => {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Methods", methods);
      res.header("Access-Control-Allow-Headers", allowedHeaders);
      res.header("Access-Control-Allow-Credentials", credentials);
      res.removeHeader("X-Powered-By");
  
      if (req.method === "OPTIONS") {
        res.sendStatus(optionsSuccessStatus);
      } else {
        next();
      }
    };
  }
}

module.exports = SecurityTools;
