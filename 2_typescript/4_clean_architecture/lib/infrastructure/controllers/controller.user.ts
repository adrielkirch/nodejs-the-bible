import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";

interface AuthenticatedRequest extends Request {
  user: string;
}

export default class UserController {
  // public service: UserService;
  public signupHandler: (req: Request, res: Response) => Promise<void>;
  public loginHandler: (req: Request, res: Response) => Promise<void>;
  public getByIdHandler: (req: AuthenticatedRequest, res: Response) => Promise<void>;
  public deleteByIdHandler: (req: AuthenticatedRequest, res: Response) => Promise<void>;
  public updateHandler: (req: AuthenticatedRequest, res: Response) => Promise<void>;

  constructor() {
    // this.service = new UserService();
    this.signupHandler = this.signup.bind(this);
    this.loginHandler = this.login.bind(this);
    this.getByIdHandler = this.getById.bind(this);
    this.deleteByIdHandler = this.deleteById.bind(this);
    this.updateHandler = this.update.bind(this);
  }

  async signup(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const { email, name, password } = req.body;
      // const user = await this.service.signup(email, name, password);
      const user = {
        _id:"c51b26c8e99b69786cd73a5f",
        name:"Test",
        email:"test@test.com"
      }
      res.status(StatusCodes.CREATED).json(user);
    } catch (error:any) {
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
      // const user = await this.service.login(email, password);
      const user = {
        _id:"c51b26c8e99b69786cd73a5f",
        name:"Test",
        email:"test@test.com"
      }
      res.status(StatusCodes.OK).json(user);
    } catch (error:any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async getById(req: AuthenticatedRequest, res: Response): Promise<any> {
    try {
      // const user = await this.service.getById(req.user);
      const user = {
        _id:"c51b26c8e99b69786cd73a5f",
        name:"Test",
        email:"test@test.com"
      }
      res.status(StatusCodes.OK).json(user);
    } catch (error:any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async deleteById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // await this.service.deleteById(req.user);
      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error:any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const payload = {
        _id: req.user,
        name: name,
      };
      // await this.service.update(payload);
      res.status(StatusCodes.OK).json({});
    } catch (error:any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
