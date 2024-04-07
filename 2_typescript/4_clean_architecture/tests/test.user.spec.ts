import dotenv from "dotenv";
dotenv.config();
import * as assert from "assert";
import { UserController } from "../lib/infrastructure/controllers/controller.user";
import Container, { Service } from "typedi";
import "reflect-metadata";
import { Request } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

interface CustomConnectOptions extends mongoose.ConnectOptions {
  bufferCommands?: boolean;
  dbName?: string;
  user?: string;
  pass?: string;
  autoIndex?: boolean;
  autoCreate?: boolean;
}

class MockRequest {
  body: { email: string; name: string; password: string, user:string };

  constructor(body: { email: string; name: string; password: string,user:string }) {
    this.body = body;
  }
}

@Service()
class TestUserClass {
  private controller: UserController;
  private res: any = {
    statusCode: undefined,
    responseData: undefined,
    status: function (code: number) {
      this.statusCode = code;
      return this;
    },
    json: function (data: any) {
      this.responseData = data;
      return this;
    },
  };
  private req: Request = new MockRequest({
    email: "test@example.com",
    name: "Test User",
    password: "Test12345678!",
    user:"",
  }) as Request;

  constructor() {
    this.controller = Container.get(UserController);
  }

  testControllers() {
    beforeEach(async () => {
      // Connect to the database and clear the "users" collection before each test
      const url = "mongodb://127.0.0.1:27017/test";
      const options: CustomConnectOptions = {
        bufferCommands: false,
        dbName: "test",
      };
      const connection = await mongoose.connect(url, options);
      await mongoose.connection.db.dropCollection("users");
    });
  
    describe("Test User class", () => {
      it("should test user signup", async () => {
        await this.controller.signup(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
      });
  
      it("should test user login", async () => {
        await this.controller.signup(this.req, this.res);
        await this.controller.login(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });

      it("should test user me", async () => {
        await this.controller.signup(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
        await this.controller.login(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);

        let responseData = this.res.responseData;
        this.req.user = responseData._id;
        await this.controller.me(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });

      it("should test user update", async () => {
        await this.controller.signup(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
        await this.controller.login(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);

        let responseData = this.res.responseData;
        this.req.user = responseData._id;
        const newName = "test updated"
        this.req.body.name = newName;
        await this.controller.update(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
        await this.controller.me(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
        responseData = this.res.responseData;
        assert.strictEqual(responseData.name, newName);
      });


      it("should test user delete", async () => {
        await this.controller.signup(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
        await this.controller.login(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);

        let responseData = this.res.responseData;
        this.req.user = responseData._id;
        await this.controller.delete(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.NO_CONTENT);
      });
    });
  }
}

const testClass = new TestUserClass();
testClass.testControllers();
