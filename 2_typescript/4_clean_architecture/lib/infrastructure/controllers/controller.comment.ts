import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { Service, Container } from "typedi";
import { AddUseCaseImpl } from "../../application/useCases/comment/write/comment.write.add";
import { ReadByIdUseCaseImpl } from "../../application/useCases/comment/read/comment.read.id";
import { ReadByTaskUseCaseImpl } from "../../application/useCases/comment/read/comment.read.task";
import { UpdateUseCaseImpl } from "../../application/useCases/comment/write/comment.write.update";
import { DeleteUseCaseImpl } from "../../application/useCases/comment/delete/comment.delete";
import { CommentRepository } from "../../application/repositories/repository.comment";

@Service()
export class CommentController {
  private addUseCase: AddUseCaseImpl;
  private readByIdUseCase: ReadByIdUseCaseImpl;
  private readByTaskUseCase: ReadByTaskUseCaseImpl;
  private updateUseCase: UpdateUseCaseImpl;
  private deleteUseCase: DeleteUseCaseImpl;

  constructor(private persistence: CommentRepository) {
    this.persistence = persistence;
    this.addUseCase = new AddUseCaseImpl(this.persistence);
    this.readByIdUseCase = new ReadByIdUseCaseImpl(this.persistence);
    this.readByTaskUseCase = new ReadByTaskUseCaseImpl(this.persistence);
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
      const { title, text, taskId } = req.body;
      const newComment = await this.addUseCase.execute(
        title,
        text,
        req.user,
        taskId
      );
      res.status(StatusCodes.CREATED).json(newComment);
    } catch (error: any) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
      const comment = await this.readByIdUseCase.execute(id);
      res.status(StatusCodes.OK).json(comment);
    } catch (error: any) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async readByTasks(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const id = req.params.id;
    try {
      const comments = await this.readByTaskUseCase.execute(id);
      res.status(StatusCodes.OK).json(comments);
    } catch (error: any) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const { _id, title, text } = req.body;
    try {
      await this.updateUseCase.execute(_id, title, text);
      res.status(StatusCodes.OK).json({});
    } catch (error: any) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
