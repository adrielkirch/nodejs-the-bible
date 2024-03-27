const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const placeController = require("../controllers/controller.place");

router.post(
  "/",
  [
    check("name").isString(),
    check("latitude").isNumeric(),
    check("longitude").isNumeric(),
  ],
  placeController.addPlace
);

router.put(
  "/",
  [
    check("_id").isString(),
    check("name").isString(),
    check("latitude").isNumeric(),
    check("longitude").isNumeric(),
  ],
  placeController.updatePlace
);

router.get("/", placeController.getNearbyPlaces);

router.delete("/:id", placeController.deletePlace);

module.exports = router;
