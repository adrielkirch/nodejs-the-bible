const jwt = require("jsonwebtoken");
const securityUtil = require("../utils/util.security");
const { StatusCodes } = require("http-status-codes");

function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = securityUtil.decodedJwt(token);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Token is not valid");
  }
}

module.exports = authMiddleware;
