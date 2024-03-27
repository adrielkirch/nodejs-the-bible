import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { Service } from "typedi";
import { SignupUseCaseImpl } from "../../application/use_cases/user/write/write.signup"; // Import the implementation
import { UserPersistence } from "../databases/user/databases.user";


@Service()
export default class UserController {
  private signupUseCase: SignupUseCaseImpl = new SignupUseCaseImpl(new UserPersistence());

  constructor() { }

  async signup(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    try {
      const { email, name, password } = req.body;
      console.log( this.signupUseCase)
      const newUser = await this.signupUseCase.execute(email, password, name);
      res.status(StatusCodes.CREATED).json(newUser);
    } catch (error: any) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
