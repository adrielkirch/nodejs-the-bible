const express = require("express");
const router = express.Router();
const userController = require("../controllers/controller.user");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/middleware.auth");

router.post(
  "/signup",
  [
    check("email").isEmail(),
    check("name").isString(),
    check("password").isString().isLength({ min: 8 }),
  ],
  userController.signup
);

router.post(
  "/login",
  [check("email").isEmail(), check("password").isString()],
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
