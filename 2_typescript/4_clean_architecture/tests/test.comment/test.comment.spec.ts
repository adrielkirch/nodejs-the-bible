import dotenv from "dotenv";
dotenv.config();
import * as assert from "assert";
import { CommentController } from "../../lib/infrastructure/controllers/controller.comment";
import "reflect-metadata";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { MockRequest } from "./mocks/test.comment.mock.request";
import { MockResponse } from "./mocks/test.comment.mock.response";
import { CommentMockPersistence } from "./mocks/test.comment.mock.persistance";
import Container from "typedi";
import { UserMock } from "../test.shared/mocks/test.shared.mock.user";
import { TaskMock } from "../test.shared/mocks/test.shared.mock.task";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

class TestTaskClass {
  private controller: CommentController;

  private req: Request = new MockRequest(
    {
      _id: "",
      title: "Lorem ipsum dolor tortor",
      text: "Lorem ipsum ...",
      taskId: TaskMock.getId(),
    },
    ""
  ) as Request;

  private res: any = new MockResponse() as any;

  constructor() {
    this.controller = Container.get(CommentController);
  }

  testControllers() {
    describe("Test Comment Controller class", () => {
      beforeEach(() => {
        this.req.user = UserMock.getId();
      });

      it("should test add comment", async () => {
        await this.controller.add(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
        this.req.body._id = this.res.responseData._id;
        this.req.params.id = this.res.responseData._id;
      });

      it("should test read comment by id", async () => {
        await this.controller.read(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });

      it("should test read comments by task id", async () => {
        this.req.params.id = this.req.body.taskId;
        await this.controller.readByTasks(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
        this.req.params.id = this.req.body._id;
      });

      it("should test update comment by id", async () => {
        this.req.body.text = "New text ... ";
        this.req.body.title = "New title ... ";
        await this.controller.update(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });

      it("should test delete comment by id", async () => {
        await this.controller.delete(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.NO_CONTENT);
      });
    });
  }
}

function dependecyInjections() {
  Container.set(CommentMockPersistence, new CommentMockPersistence());
  Container.set(
    CommentController,
    new CommentController(Container.get(CommentMockPersistence))
  );
}

dependecyInjections();
const testClass = new TestTaskClass();
testClass.testControllers();
