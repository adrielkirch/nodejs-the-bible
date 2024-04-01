import { Router } from "express";
import { check } from "express-validator";
import { CommentController } from "../controllers/controller.comment";
import 'reflect-metadata';
import { Container } from 'typedi';
import { authMiddleware } from "../middlewares/middleware.auth";

export class CommentRouter {
  public router: Router;
  private controller: CommentController;

  constructor() {
    this.router = Router();
    // Injecting UserController using TypeDI
    this.controller = Container.get(CommentController);
    this.createRoutes();
  }

  public createRoutes(): Router {
    this.router.post(
      "/",
      [
        authMiddleware,
        check("title").isString(),
        check("text").isString(),
        check("taskId").isLength({ min: 24, max: 24 }),
      ],
      this.controller.add.bind(this.controller)
    );
    this.router.delete(
      "/:id",
      [authMiddleware, check("id").isLength({ min: 24, max: 24 })],
      this.controller.delete.bind(this.controller)
    );

    this.router.get(
      "/:id",
      [authMiddleware, check("id").isLength({ min: 24, max: 24 })],
      this.controller.read.bind(this.controller)
    );

    this.router.get(
      "/task/:id",
      [authMiddleware, check("id").isLength({ min: 24, max: 24 })],
      this.controller.readByTasks.bind(this.controller)
    );


    this.router.put(
      "/",
      [
        authMiddleware,
        check("_id").isString().isLength({ min: 24, max: 24 }),
        check("title").isString(),
        check("text").isString(),
      ],
      this.controller.update.bind(this.controller)
    );
    return this.router;
  }
}
