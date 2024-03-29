
import { Task } from "../../domain/entities/entity.task";
import { Status } from "../../domain/types/taskStatus";

export interface TaskRepository {
    add(title: string, text: string, expirationDate: Date, remindDate: Date): Promise<Task>;
    update(id: string, title: string, text: string, expirationDate: Date, remindDate: Date,status:Status): Promise<void>;
    read(id:string): Promise<Task | null>;
    delete(id:string): Promise<void>;
}