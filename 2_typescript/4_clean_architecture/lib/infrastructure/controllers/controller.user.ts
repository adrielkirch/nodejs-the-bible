import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { Service, Container } from "typedi";
import { SignupUseCaseImpl } from "../../application/useCases/user/write/user.write.signup";
import { LoginUseCaseImpl } from "../../application/useCases/user/write/user.write.login";
import { UserPersistence } from "../databases/user/databases.user";
import { ReadByIdUseCaseImpl } from "../../application/useCases/user/read/user.read.id";
import { UpdateUseCaseImpl } from "../../application/useCases/user/write/user.write.update";
import { DeleteUseCaseImpl } from "../../application/useCases/user/delete/user.delete.user";

@Service()
export class UserController {
  private signupUseCase: SignupUseCaseImpl;
  private loginUseCase: LoginUseCaseImpl;
  private readByIdUseCase: ReadByIdUseCaseImpl;
  private updateUseCase: UpdateUseCaseImpl;
  private deleteUseCase: DeleteUseCaseImpl;
  private persistence: UserPersistence;

  constructor() {
    this.persistence = Container.get(UserPersistence);
    this.signupUseCase = new SignupUseCaseImpl(this.persistence);
    this.loginUseCase = new LoginUseCaseImpl(this.persistence);
    this.readByIdUseCase = new ReadByIdUseCaseImpl(this.persistence);
    this.updateUseCase = new UpdateUseCaseImpl(this.persistence);
    this.deleteUseCase = new DeleteUseCaseImpl(this.persistence);
  }

  async signup(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const { email, name, password } = req.body;
      const newUser = await this.signupUseCase.execute(email, password, name);
      res.status(StatusCodes.CREATED).json(newUser);
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const { email, password } = req.body;
      const authData = await this.loginUseCase.execute(email, password);
      res.status(StatusCodes.OK).json(authData);
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await this.readByIdUseCase.execute(req.user);
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
    const { name } = req.body;
    try {
      await this.updateUseCase.execute(req.user, name);
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
    try {
      
       await this.deleteUseCase.execute(req.user);
      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
