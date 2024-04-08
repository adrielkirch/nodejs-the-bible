import Container from "typedi";
import { UserPersistence } from "./infrastructure/databases/user/databases.user";
import { UserController } from "./infrastructure/controllers/controller.user";
import { TaskController } from "./infrastructure/controllers/controller.task";
import { TaskPersistence } from "./infrastructure/databases/task/databases.task";
import { UserRouter } from "./infrastructure/routes/route.user";
import { TaskRouter } from "./infrastructure/routes/route.task";
import { CommentPersistence } from "./infrastructure/databases/comment/databases.comment";
import { CommentController } from "./infrastructure/controllers/controller.comment";
import { CommentRouter } from "./infrastructure/routes/route.comment";
import "reflect-metadata";

export default function dependecyInjections() {
    Container.set(UserPersistence, new UserPersistence());
    Container.set(
      UserController,
      new UserController(Container.get(UserPersistence))
    );
    Container.set(UserRouter, new UserRouter());
  
    Container.set(TaskPersistence, new TaskPersistence());
    Container.set(
      TaskController,
      new TaskController(Container.get(TaskPersistence))
    );
    Container.set(TaskRouter, new TaskRouter());
  
    Container.set(CommentPersistence, new CommentPersistence());
    Container.set(
      CommentController,
      new CommentController(Container.get(CommentPersistence))
    );
    Container.set(CommentRouter, new CommentRouter());
  }
  