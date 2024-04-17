import express, { Request, Response, Router } from "express";
import { check } from "express-validator";
import UserController from "../controllers/controller.user";
import authMiddleware from "../middlewares/middleware.auth";
import AuthRequest from "../models/models.auth";

export class UserRouter {
  public router: Router;
  public controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.createRoutes();
  }

  public createRoutes(): Router {
    this.router.post(
      "/signup",
      [
        check("email").isEmail(),
        check("name").isString(),
        check("password").isString().isLength({ min: 8 }),
      ],
      this.controller.signup.bind(this.controller) as (req: Request, res: Response) => Promise<void>
    );

    this.router.post(
      "/login",
      [check("email").isEmail(), check("password").isString()],
      this.controller.login.bind(this.controller) as (req: Request, res: Response) => Promise<void>
    );

    this.router.get(
      "/",
      [authMiddleware],
      this.controller.getById.bind(this.controller) as (req: AuthRequest, res: Response) => Promise<void>
    );

    this.router.delete(
      "/",
      [authMiddleware],
      this.controller.deleteById.bind(this.controller) as (req: AuthRequest, res: Response) => Promise<void>
    );

    this.router.put(
      "/",
      [authMiddleware, check("name").isString()],
      this.controller.update.bind(this.controller) as (req: AuthRequest, res: Response) => Promise<void>
    );
    return this.router;
  }
}
