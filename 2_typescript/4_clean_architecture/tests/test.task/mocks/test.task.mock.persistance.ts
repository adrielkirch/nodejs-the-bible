import { TaskRepository } from "../../../lib/application/repositories/repository.task";
import { Task } from "../../../lib/domain/entities/entity.task";
import { v4 as uuidv4 } from "uuid";
import { Status } from "../../../lib/domain/types/taskStatus";
import { TaskUser } from "../../../lib/domain/entities/entity.taskUser";
import { User } from "../../../lib/domain/entities/entity.user";

export class TaskMockPersistence implements TaskRepository {
  private db: TaskUser[] = [];

  
  async add(title: string, text: string, expirationDate: Date | null, remindDate: Date | null, assignTo: string, userId: string): Promise<Task> {
    const newTaskId = uuidv4();
    const created = new Date();
    const updated = new Date();
    const newTask = new TaskUser(
      new Task (newTaskId, title, text, created, updated, expirationDate || new Date(), remindDate || new Date(), 'TODO', assignTo, userId),
      new User(userId, "", "", "", new Date(), new Date())
    );
    this.db.push(newTask);
    return newTask;
  }


  async update(id: string, title: string, text: string, assignTo: string): Promise<void> {
    const taskIndex = this.db.findIndex(task => task._id === id);
    if (taskIndex !== -1) {
      this.db[taskIndex] = {
        ...this.db[taskIndex],
        title,
        text,
        assignTo
      };
    }
  }

  async updateStatus(id: string, status: Status): Promise<void> {
    const taskIndex = this.db.findIndex(task => task._id === id);
    if (taskIndex !== -1) {
      this.db[taskIndex] = {
        ...this.db[taskIndex],
        status: status
      }
    }
  }

  async updateSchedule(id: string, expirationDate: Date, remindDate: Date): Promise<void> {
    const taskIndex = this.db.findIndex(task => task._id === id);
    if (taskIndex !== -1) {
      this.db[taskIndex] = {
        ...this.db[taskIndex],
        expirationDate: expirationDate,
        remindDate: remindDate
      }
    }
  }

  async read(id: string): Promise<TaskUser | null> {
    const task = this.db.find(task => task._id === id);
    return task ? { ...task } : null;
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.db.findIndex(task => task._id === id);
    if (taskIndex !== -1) {
      this.db.splice(taskIndex, 1);
    }
  }
  
}
