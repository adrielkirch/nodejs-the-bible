import dotenv from "dotenv";
dotenv.config();
import * as assert from "assert";
import {UserController} from "../lib/infrastructure/controllers/controller.user"
const userController = new UserController()
import sinon from 'sinon';
import { Request, Response } from "express";

const userData: any = {
  "email": "adriel.kirch1.@gmail.com",
  "password": "Roadr2024@",
  "name": "adriel.kirch.1@gmail.com"
} as any;

describe("Test service class", () => {
  it("should sign up return it", async () => {
    // Mock request and response objects
    const req : Request = {
      body: userData // Pass userData as request body
    } as Request;

    const res: Response = { // Create res object with Response type
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    } as Response;
    
    await userController.signup(req, res);
  });
});
