import { Router } from "express";
import { check } from "express-validator";
import { UserController } from "../controllers/controller.user";
import 'reflect-metadata';
import { Container } from 'typedi';

export class UserRouter {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    // Injecting UserController using TypeDI
    this.controller = Container.get(UserController);
    this.createRoutes();
  }

  public createRoutes(): Router {
    const signupHandler = this.controller.signup.bind(this.controller);

    this.router.post(
      "/signup",
      [
        check("email").isEmail().normalizeEmail(),
        check("name").isString(),
        check("password").isString().isLength({ min: 8 }),
      ],
      signupHandler
    );

    return this.router;
  }
}
