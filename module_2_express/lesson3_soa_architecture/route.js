const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { check } = require("express-validator");
const authMiddleware = require("./middleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User and Authentication endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
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
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
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
 * /login:
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
 * /:
 *   get:
 *     summary: Get user details
 *     tags: [Authentication]
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
 * /:
 *   delete:
 *     summary: Delete user account
 *     tags: [Authentication]
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
