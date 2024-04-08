import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { Service, Container } from "typedi";
import { AddUseCaseImpl } from "../../application/useCases/task/write/task.write.add";
import { ReadByIdUseCaseImpl } from "../../application/useCases/task/read/task.read.id";
import { UpdateUseCaseImpl } from "../../application/useCases/task/write/task.write.update";
import { UpdateStatusUseCaseImpl } from "../../application/useCases/task/write/task.write.update.status";
import { UpdateScheduleUseCaseImpl } from "../../application/useCases/task/write/task.write.update.schedule";
import { DeleteUseCaseImpl } from "../../application/useCases/task/delete/task.delete";
import { TaskRepository } from "../../application/repositories/repository.task";

@Service()
export class TaskController {
  private addUseCase: AddUseCaseImpl;
  private readByIdUseCase: ReadByIdUseCaseImpl;
  private updateUseCase: UpdateUseCaseImpl;
  private updateStatusUseCase: UpdateStatusUseCaseImpl;
  private updateScheduleUseCase: UpdateScheduleUseCaseImpl;
  private deleteUseCase: DeleteUseCaseImpl;


  constructor(private persistence: TaskRepository) {
    this.persistence = persistence;
    this.addUseCase = new AddUseCaseImpl(this.persistence);
    this.readByIdUseCase = new ReadByIdUseCaseImpl(this.persistence);
    this.updateUseCase = new UpdateUseCaseImpl(this.persistence);
    this.updateStatusUseCase = new UpdateStatusUseCaseImpl(this.persistence)
    this.updateScheduleUseCase = new UpdateScheduleUseCaseImpl(this.persistence)
    this.deleteUseCase = new DeleteUseCaseImpl(this.persistence);
  }

  async add(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const { title, text, expirationDate, remindDate, assignTo } = req.body;
      const newTask = await this.addUseCase.execute(title, text, expirationDate, remindDate, assignTo, req.user);
      res.status(StatusCodes.CREATED).json(newTask);
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }


  async read(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const id = req.params.id;
    try {
      const user = await this.readByIdUseCase.execute(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const { _id, title, text, assignTo } = req.body;
    try {
      await this.updateUseCase.execute(_id, title, text, assignTo);
      res.status(StatusCodes.OK).json({});
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
  async updateSchedule(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const { _id, expirationDate, remindDate} = req.body;
    try {
      await this.updateScheduleUseCase.execute(_id, expirationDate, remindDate);
      res.status(StatusCodes.OK).json({});
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const { _id, status } = req.body;
    try {
      await this.updateStatusUseCase.execute(_id, status);
      res.status(StatusCodes.OK).json({});
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const id = req.params.id;
    try {
      await this.deleteUseCase.execute(id);
      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
