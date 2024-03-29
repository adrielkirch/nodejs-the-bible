import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { Service, Container } from "typedi";
import { AddUseCaseImpl } from "../../application/useCases/task/write/task.write.add";
import { ReadByIdUseCaseImpl } from "../../application/useCases/task/read/task.read.id";
import { UpdateUseCaseImpl } from "../../application/useCases/task/write/task.write.update";
import { DeleteUseCaseImpl } from "../../application/useCases/task/delete/task.delete";
import { TaskPersistence } from "../databases/task/databases.task";

@Service()
export class TaskController {
  private addUseCase: AddUseCaseImpl;
  private readByIdUseCase: ReadByIdUseCaseImpl;
  private updateUseCase: UpdateUseCaseImpl;
  private deleteUseCase: DeleteUseCaseImpl;
  private persistence: TaskPersistence;

  constructor() {
    this.persistence = Container.get(TaskPersistence);
    this.addUseCase = new AddUseCaseImpl(this.persistence);
    this.readByIdUseCase = new ReadByIdUseCaseImpl(this.persistence);
    this.updateUseCase = new UpdateUseCaseImpl(this.persistence);
    this.deleteUseCase = new DeleteUseCaseImpl(this.persistence);
  }

  async add(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const { title, text, expirationDate, remindDate } = req.body;
      const newTask = await this.addUseCase.execute(title, text, expirationDate, remindDate);
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
    const { _id, title, text, expirationDate, remindDate, status } = req.body;
    try {
      await this.updateUseCase.execute(_id, title, text, expirationDate, remindDate, status);
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
