import { Router } from "express";
import { check } from "express-validator";
import { UserController } from "../controllers/controller.user";
import 'reflect-metadata';
import { Container, Service } from 'typedi';
import { authMiddleware } from "../middlewares/middleware.auth";
import { UserRepository } from "../../application/repositories/repository.user";

@Service()
export class UserRouter {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = Container.get(UserController)
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
      this.controller.signup.bind(this.controller)
    );

    this.router.post(
      "/login",
      [
        check("email").isEmail(),
        check("password").isString(),
      ],
      this.controller.login.bind(this.controller)
    );

    this.router.get(
      "/me",
      [authMiddleware],
      this.controller.me.bind(this.controller)
    );

    this.router.put(
      "/",
      [authMiddleware,
        check("name").isString(),
      ],
      this.controller.update.bind(this.controller)
    );

    this.router.delete(
      "/",
      [authMiddleware],
      this.controller.delete.bind(this.controller)
    );

    return this.router;
  }
}

