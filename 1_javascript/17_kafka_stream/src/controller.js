const { StatusCodes } = require("http-status-codes");
const fleetService = require("./service");
const { validationResult } = require("express-validator");

async function produceLocation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const {latitude, longitude, status, companyId, companyName } = req.body;
    await fleetService.produceLocation(latitude, longitude, status, companyId, companyName);
    res.status(StatusCodes.CREATED).json({
      message: "Location produced successfully",
      status: 200,
      data: null,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

module.exports = {
  produceLocation
};
