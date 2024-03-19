const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { check } = require("express-validator");
const authMiddleware = require("./middleware");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up for a new account
 *     tags: [Authentication]
 *     description: Register a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Password for the account (minimum 8 characters).
 *     responses:
 *       '200':
 *         description: User signed up successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 */

router.post(
    "/signup",
    [
      check("email").isEmail().normalizeEmail(),
      check("name").isString(),
      check("password").isString().isLength({ min: 8 }),
    ],
    userController.signup
  );
  
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  "/login",
  [check("email").isEmail().normalizeEmail(), check("password").isString()],
  userController.login
);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get("/", [authMiddleware], userController.getById);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.delete("/", [authMiddleware], userController.deleteById);

module.exports = router;
