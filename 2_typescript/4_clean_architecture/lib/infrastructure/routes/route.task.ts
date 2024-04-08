import { Router } from "express";
import { check } from "express-validator";
import { TaskController } from "../controllers/controller.task";
import "reflect-metadata";
import { Container, Service } from "typedi";
import { authMiddleware } from "../middlewares/middleware.auth";
import DateUtil from "../../utils/util.date";

@Service()
export class TaskRouter {
  public router: Router;
  private controller: TaskController;

  constructor() {
    this.router = Router();
    this.controller = Container.get(TaskController);
    this.createRoutes();
  }

  public createRoutes(): Router {
    this.router.post(
      "/",
      [
        authMiddleware,
        check("title").isString(),
        check("text").isString(),
        check("expirationDate")
          .isString()
          .matches(DateUtil.defaultFormatRegex)
          .withMessage(
            `Expiration datetime must be in the format "${DateUtil.defaultFormat}"`
          ),
        check("remindDate")
          .isString()
          .matches(DateUtil.defaultFormatRegex)
          .withMessage(
            `Remind datetime must be in the format "${DateUtil.defaultFormat}"`
          ),
        check("assignTo").isLength({ min: 24, max: 24 }),
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

    this.router.put(
      "/",
      [authMiddleware, check("_id").isString().isLength({ min: 24, max: 24 })],
      this.controller.update.bind(this.controller)
    );

    this.router.put(
      "/schedule",
      [
        authMiddleware,
        check("_id").isString().isLength({ min: 24, max: 24 }),
        check("expirationDate")
          .isString()
          .matches(DateUtil.defaultFormatRegex)
          .withMessage(
            `Expiration datetime must be in the format "${DateUtil.defaultFormat}"`
          ),
        check("remindDate")
          .isString()
          .matches(DateUtil.defaultFormatRegex)
          .withMessage(
            `Remind datetime must be in the format "${DateUtil.defaultFormat}"`
          ),
      ],
      this.controller.updateSchedule.bind(this.controller)
    );

    this.router.put(
      "/status",
      [
        authMiddleware,
        check("_id").isString().isLength({ min: 24, max: 24 }),
        check("status").isString(),
      ],
      this.controller.updateStatus.bind(this.controller)
    );

    return this.router;
  }
}
