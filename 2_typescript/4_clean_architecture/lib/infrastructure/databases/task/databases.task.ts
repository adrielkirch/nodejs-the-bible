import { Task } from "../../../domain/entities/entity.task";
import { TaskRepository } from "../../../application/repositories/repository.task";
import { Service } from "typedi";
import { Model } from "mongoose";
import { TaskDocument, TaskModel } from "../../../domain/schemas/schema.task";
import { Status } from "../../../domain/types/taskStatus";
import { ObjectId } from "mongodb";
import { TaskUser } from "../../../domain/entities/entity.taskUser";

@Service()
export class TaskPersistence implements TaskRepository {
  private taskModel: Model<TaskDocument>;

  constructor() {
    this.taskModel = TaskModel;
  }

  private mapToTaskUser(result: any): TaskUser | null {
    if (!result) {
      return null;
    }

    return {
      _id: result._id.toString(),
      title: result.title,
      text: result.text,
      created: result.created,
      updated: result.updated,
      expirationDate: result.expirationDate,
      remindDate: result.remindDate,
      status: result.status,
      assignTo: result.assignTo.toString(),
      userId: result.userId.toString(),
      user: {
        _id: result.user._id.toString(),
        email: result.user.email,
        password: result.user.password,
        name: result.user.name,
        created: result.user.created,
        updated: result.user.updated,
      },
    };
  }

  async add(
    title: string,
    text: string,
    expirationDate: Date,
    remindDate: Date,
    assignTo: string,
    userId: string
  ): Promise<Task> {
    const newTask = await this.taskModel.create({
      title,
      text,
      expirationDate,
      remindDate,
      created: Date.now(),
      updated: Date.now(),
      status: "TODO",
      assignTo: new ObjectId(assignTo),
      userId: new ObjectId(userId),
    });
    return newTask.toObject();
  }

  async read(id: string): Promise<TaskUser | null> {
    const task = await this.taskModel.findById(id).exec();
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ];
    const result = await this.taskModel.aggregate(pipeline);
    return this.mapToTaskUser(result[0]);
  }

  async update(id: string, title: string, text: string): Promise<void> {
    await this.taskModel.findByIdAndUpdate(id, {
      title,
      text,
      updated: Date.now(),
    });
  }

  async updateStatus(id: string, status: Status): Promise<void> {
    await this.taskModel.findByIdAndUpdate(id, {
      status,
      updated: Date.now(),
    });
  }

  async updateSchedule(
    id: string,
    expirationDate: Date,
    remindDate: Date
  ): Promise<void> {
    await this.taskModel.findByIdAndUpdate(id, {
      expirationDate,
      remindDate,
      updated: Date.now(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id);
  }
}
