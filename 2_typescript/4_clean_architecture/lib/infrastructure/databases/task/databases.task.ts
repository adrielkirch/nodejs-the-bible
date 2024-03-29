import { Task } from "../../../domain/entities/entity.task";
import { TaskRepository } from "../../../application/repositories/repository.task";
import { Service } from "typedi";
import { Model } from 'mongoose';
import { TaskDocument, TaskModel } from "../../../domain/schemas/schema.task";
import { Status } from "../../../domain/types/taskStatus";

@Service()
export class TaskPersistence implements TaskRepository {
    private taskModel: Model<TaskDocument>;

    constructor() {
        this.taskModel = TaskModel;
    }

    private mapToTask(result: any): Task | null {
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
        };
    }

    async add(title: string, text: string, expirationDate: Date, remindDate: Date): Promise<Task> {
        const newTask = await this.taskModel.create({ title, text, expirationDate, remindDate, created: Date.now(), updated: Date.now(), status:"TODO" });
        return newTask.toObject();
    }

    async read(id: string): Promise<Task | null> {
        const task = await this.taskModel.findById(id).exec();
        return this.mapToTask(task);
    }


    async update(id: string, title: string, text: string, expirationDate: Date, remindDate: Date, status: Status): Promise<void> {
        await this.taskModel.findByIdAndUpdate(id, {
            title, text, expirationDate, remindDate, status, updated: Date.now()
        });
    }

    async delete(id: string): Promise<void> {
        await this.taskModel.findByIdAndDelete(id);
    }
}
