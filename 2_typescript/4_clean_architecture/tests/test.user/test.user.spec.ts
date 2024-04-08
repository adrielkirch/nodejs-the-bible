import dotenv from "dotenv";
dotenv.config();
import * as assert from "assert";
import { UserController } from "../../lib/infrastructure/controllers/controller.user";
import "reflect-metadata";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { MockRequest } from "./mocks/test.user.mock.request";
import { MockResponse } from "./mocks/test.user.mock.response";
import { UserMockPersistence } from "./mocks/test.user.mock.persistance";
import Container from "typedi";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

Container.set(UserMockPersistence, new UserMockPersistence());



class TestUserClass {
  private controller: UserController;

  private req: Request = new MockRequest({
    email: "test1@example.com",
    name: "Test User",
    password: "Test12345678!",
    user: "",
  }) as Request;

  private res: any = new MockResponse() as any;
  private persistance: UserMockPersistence;
  constructor() {
    this.controller = Container.get(UserController)
    this.persistance = Container.get(UserMockPersistence)
  }

  testControllers() {
    describe("Test User class", () => {
      it("should test user signup", async () => {
        await this.controller.signup(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
        const user = this.persistance.getDb()[0];
        assert.strictEqual(user._id.length, 36);
      });

      it("should test user login", async () => {
        await this.controller.login(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
        let responseData = this.res.responseData;
        assert.strictEqual( responseData._id.length, 36);
        this.req.user = responseData._id;
      });

      it("should test user me", async () => {
        await this.controller.me(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });

      it("should test user update", async () => {
        const newName = "test updated";
        this.req.body.name = newName;
        await this.controller.update(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
        const users = this.persistance.getDb()[0];
        assert.strictEqual(users.name, newName);
      });

      it("should test user delete", async () => {
        await this.controller.delete(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.NO_CONTENT);
        const users = this.persistance.getDb();
        assert.strictEqual(users.length, 0);
      });
    });
  }
}

function dependecyInjections() {
  Container.set(UserMockPersistence, new UserMockPersistence());
  Container.set(
    UserController,
    new UserController(Container.get(UserMockPersistence))
  );
}
dependecyInjections()
const testClass = new TestUserClass();
testClass.testControllers();
