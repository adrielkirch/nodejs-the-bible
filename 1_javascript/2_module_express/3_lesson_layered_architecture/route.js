const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { check } = require("express-validator");
const authMiddleware = require("./middleware");

router.post(
  "/signup",
  [
    check("email").isEmail().normalizeEmail(),
    check("name").isString(),
    check("password").isString().isLength({ min: 8 }),
  ],
  userController.signup
);

router.post(
  "/login",
  [check("email").isEmail().normalizeEmail(), check("password").isString()],
  userController.login
);

router.get("/", [authMiddleware], userController.getById);

router.delete("/", [authMiddleware], userController.deleteById);

router.put(
  "/",
  [authMiddleware, check("name").isString()],
  userController.update
);

module.exports = router;
