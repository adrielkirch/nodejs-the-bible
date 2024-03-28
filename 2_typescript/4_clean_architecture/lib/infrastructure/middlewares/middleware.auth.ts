import {  Response, NextFunction, Request } from "express";
import SecurityUtil from "../../utils/util.security";
import { StatusCodes } from "http-status-codes";


declare global {
  namespace Express {
      interface Request {
          user: string; 
      }
  }
}


export function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {

    req.user = SecurityUtil.decodedJwt(token);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Token is not valid");
  }
}



