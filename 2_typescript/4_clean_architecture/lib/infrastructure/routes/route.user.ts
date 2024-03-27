import { Router } from "express";
import { check } from "express-validator";
import UserController from "../controllers/controller.user";

export class UserRouter {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.createRoutes();
  }

  
  public createRoutes(): Router {
    this.router.post(
      "/signup",
      [
        check("email").isEmail().normalizeEmail(),
        check("name").isString(),
        check("password").isString().isLength({ min: 8 }),
      ],
      async (req, res) => {
        await this.controller.signup(req, res);
      }
    );

    return this.router;
  }
}
