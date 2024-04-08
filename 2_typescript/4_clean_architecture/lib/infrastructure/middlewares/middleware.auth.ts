import {  Response, NextFunction, Request } from "express";
import SecurityUtil from "../../utils/util.security";
import { StatusCodes } from "http-status-codes";
import { ReadByIdUseCaseImpl } from "../../application/useCases/user/read/user.read.id"; 
import Container from "typedi";
import { UserPersistence } from "../databases/user/databases.user";


declare global {
  namespace Express {
      interface Request {
          user: string; 
      }
  }
}


export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = SecurityUtil.decodedJwt(token);
    const persistance = Container.get(UserPersistence); 
    const readByIdUseCase = new ReadByIdUseCaseImpl(persistance);
    await readByIdUseCase.execute(req.user);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Token is not valid");
  }
}