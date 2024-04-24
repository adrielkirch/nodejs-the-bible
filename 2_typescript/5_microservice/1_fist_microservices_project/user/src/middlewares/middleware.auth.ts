import {  Response, NextFunction } from "express";
import SecurityUtil from "../utils/util.security";
import { StatusCodes } from "http-status-codes";
import AuthRequest from "../models/model.auth";

// Define an interface that extends the Request interface to include the user property


function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response | void {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Assign decoded JWT to the user property
    req.user = SecurityUtil.decodedJwt(token);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Token is not valid");
  }
}

export default authMiddleware;
