import { Router } from "express";
import { check } from "express-validator";
import { UserController } from "../controllers/controller.user";
import 'reflect-metadata';
import { Container } from 'typedi';
import { authMiddleware } from "../middlewares/middleware.auth";

export class TaskRouter {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    // Injecting UserController using TypeDI
    this.controller = Container.get(UserController);
    this.createRoutes();
  }

  public createRoutes(): Router {
    this.router.post(
      "/",
      [
        authMiddleware,
        check("title").isString(),
        check("text").isString(),
        check("expirationDate").isString(),
        check("remindDate").isString(),
        check("status").isString()
      ],
      this.controller.signup.bind(this.controller)
    );
    this.router.delete(
      "/:id",
      [authMiddleware, check("id").isLength({ min: 24, max: 24 })],
      this.controller.delete.bind(this.controller)
    );

    this.router.get(
      "/:id",
      [authMiddleware, check("id").isLength({ min: 24, max: 24 })],
      this.controller.me.bind(this.controller)
    );

    this.router.put(
      "/",
      [
        authMiddleware,
        check("_id").isString().isLength({ min: 24, max: 24 }),
        check("title").isString(),
        check("text").isString(),
        check("expirationDate").isString(),
        check("remindDate").isString(),
        check("status").isString(),
      ],
      this.controller.update.bind(this.controller)
    );
    return this.router;
  }
}
