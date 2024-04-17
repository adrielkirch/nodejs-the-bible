"use strict";

const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const SecurityTools = require("@adrielkirch/security-basic-tools");
const SALT = "MySecretSalt";
const SECRET_AES = "MySecretAesKey";
const SECRET_JWT_KEY = "MySecretJWTKey";
const IV = SecurityTools.generateRandomBytes(8);
/**
 * {
 *  "email":"",
 *  "name":"",
 *  "identificationNumber:"",
 *  "password":""
 * }
 */
let users = [];

/**
 * Retrieve an user by _id.
 * @route GET /user/{id}
 * @param {number} id.path.required - The ID of the user.
 * @returns {Object} The user object.
 * @throws {Error} Internal server error.
 */
router.get("/id/:id", async (req, res) => {
  try {
    // Logic to retrieve user by _id
    const userId = req.params.id;
    let user = users.find((user) => user.id === userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `User with ID ${userId} not found` });
    }

    user = SecurityTools.removeSensitiveProperties(user, [
      "password",
      "identificationNumber",
    ]);
    res.json(user);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

/**
 * Retrieve all users.
 * @route GET /user
 * @returns {Array} An array of users.
 * @throws {Error} Internal server error.
 */
router.get("/all", async (req, res) => {
  try {
    let sanitaziedUsers = _.cloneDeep(users);

    for (let i = 0; i < sanitaziedUsers.length; i++) {
      sanitaziedUsers[i] = SecurityTools.removeSensitiveProperties(
        sanitaziedUsers[i],
        ["password", "identificationNumber"]
      );
    }
    res.json(sanitaziedUsers);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

/**
 * Add a new user.
 * @route POST /user
 * @param {Object} user.body.required - The user object to add.
 * @returns {Object} The added user.
 * @throws {Error} Bad request if the user is invalid.
 */
router.post("/", async (req, res) => {
  try {
    const { name, password, email, identificationNumber } = req.body;
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      throw new Error(`user with email ${email} already exists.`);
    } else if (!SecurityTools.isStrongPassword(password)) {
      throw new Error(`Password not strong enough`);
    }

    const encrypted = SecurityTools.encryptAES(
      identificationNumber,
      SECRET_AES,
      IV
    );

    const hashedPassword = SecurityTools.generateHashWithSalt(password, SALT);
    const newUser = {
      id: SecurityTools.generateUUID(),
      email: email,
      password: hashedPassword,
      name: name,
      identificationNumber: encrypted,
    };
    users.push(newUser);
    res.status(StatusCodes.CREATED).json({
      email,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
});

/**
 * login user.
 * @route POST /user
 * @param {Object} user.body.required - The user object to add.
 * @returns {Object} The added user.
 * @throws {Error} Bad request if the user is invalid.
 */
router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const hashedPassword = SecurityTools.generateHashWithSalt(password, SALT);
    const existingUser = users.find(
      (u) => u.email === email && u.password === hashedPassword
    );

    if (!existingUser) {
      throw new Error(`E-mail or password incorrect(s)`);
    }

    const result = {
      token: SecurityTools.generateJwt(existingUser.id, SECRET_JWT_KEY),
    };

    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
});

/**
 * Get an existing user by email.
 * @route GET /user/{email}
 *
 * @throws {Error} Bad request if the user is invalid.
 */
router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      throw new Error(`user with email ${email} not exists.`);
    }

    const sanitaziedUser = SecurityTools.removeSensitiveProperties(
      existingUser,
      ["password", "identificationNumber"]
    );

    res.json(sanitaziedUser);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
});

/**
 * Get an personal account by token
 * @route GET /user/me
 * @param {Object} user.body.required - The updated user object.
 * @returns {Object} Email user sanitazied.
 * @throws {Error} Bad request if the user is invalid.
 */
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const userId = SecurityTools.decodedJwt(token, SECRET_JWT_KEY);

    let existingUser = users.find((user) => user.id === userId);
    if (!existingUser) {
      throw new Error(`Invalid token`);
    }
    existingUser = SecurityTools.removeSensitiveProperty(
      existingUser,
      "password"
    );

    existingUser.identificationNumber = SecurityTools.decryptAES(
      existingUser.identificationNumber,
      SECRET_AES,
      IV
    );
    res.json(existingUser);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
});

/**
 * Update an existing user.
 * @route PUT /user/{id}
 * @param {number} id.path.required - The ID of the user to update.
 * @param {Object} user.body.required - The updated user object.
 * @returns {Object} The updated user.
 * @throws {Error} Bad request if the user is invalid.
 */
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateduser = req.body;
    if (!updateduser.hasOwnProperty("id")) {
      throw new Error("Invalid user format. 'id' property is required.");
    }

    const existingUser = users.find((user) => user.id === updateduser.id);
    if (!existingUser) {
      throw new Error(`user with ID ${updateduser.id} not already exists.`);
    }
    users[id] = updateduser;
    res.json(updateduser);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
});

/**
 * Delete an user by _id.
 * @route DELETE /user/{id}
 * @param {number} id.path.required - The ID of the user to delete.
 * @returns {void}
 * @throws {Error} Bad request if deletion fails.
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    users.splice(id, 1);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
});

module.exports = router;
