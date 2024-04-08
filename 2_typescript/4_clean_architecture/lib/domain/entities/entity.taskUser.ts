import { Status } from "../types/taskStatus";
import { Task } from "./entity.task";
import { User } from "./entity.user";

export class TaskUser extends Task {
  public user: User;

  constructor(task: Task, user: User) {
    super(
      task._id,
      task.title,
      task.text,
      task.created,
      task.updated,
      task.expirationDate,
      task.remindDate,
      task.status,
      task.assignTo,
      task.userId
    );
    this.user = user;
  }
}
