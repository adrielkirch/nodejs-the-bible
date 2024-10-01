const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { check } = require("express-validator");

router.post(
  "/location",
  [
    check("latitude").isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
    check("longitude").isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
    check("status").isString().withMessage('Status must be a string'),
    check("roomId").isString().withMessage('Room ID must be a string'),
    check("companyName").isString().withMessage('Company Name must be a string'),
  ],
  userController.produceLocation
);

module.exports = router;