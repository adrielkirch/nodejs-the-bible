
import { Task } from "../../domain/entities/entity.task";
import { Status } from "../../domain/types/taskStatus";

export interface TaskRepository {
    add(title: string, text: string, expirationDate: Date | null, remindDate: Date | null, assignTo:string,userId:string): Promise<Task>;
    update(id: string, title: string, text: string, assignTo:string): Promise<void>;
    updateStatus(id: string, status:Status): Promise<void>;
    updateSchedule(id: string,expirationDate: Date, remindDate: Date): Promise<void>;
    read(id:string): Promise<Task | null>;
    delete(id:string): Promise<void>;
}