import dotenv from "dotenv";
dotenv.config();
import * as assert from "assert";
import { TaskController } from "../../lib/infrastructure/controllers/controller.task";
import "reflect-metadata";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { MockRequest } from "./mocks/test.task.mock.request";
import { MockResponse } from "./mocks/test.task.mock.response";
import { TaskMockPersistence } from "./mocks/test.task.mock.persistance";
import Container from "typedi";
import { UserMock } from "../test.shared/mocks/test.shared.mock.user";
declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

class TestTaskClass {
  private controller: TaskController;

  private req: Request = new MockRequest(
    {
      _id: "",
      title: "Lorem ipsum dolor tortor",
      text: "Lorem ipsum ...",
      assignTo: "660af95a6b8c3dad366cd9b1",
      expirationDate: "09/01/2200 00:00:01",
      remindDate: "09/01/2200 00:00:00",
    },
    ""
  ) as Request;

  private res: any = new MockResponse() as any;

  constructor() {
    this.controller = Container.get(TaskController);
  }

  testControllers() {
    describe("Test Task Controller class", () => {
      beforeEach(() => {
        this.req.user = UserMock.getId();
      });

      it("should test add task", async () => {
        await this.controller.add(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.CREATED);
        this.req.body._id = this.res.responseData._id;
        this.req.params.id = this.res.responseData._id;
      });
      it("should read task by id", async () => {
        await this.controller.read(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });
      it("should test basic update task", async () => {
        const newTitle = "newTitle";
        const newDescription = "newDescription";
        const newAssingTo = UserMock.getId();
        this.req.body.title = newTitle;
        this.req.body.describe = newDescription;
        this.req.body.assignTo = newAssingTo;
        await this.controller.update(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });
      it("should test status update task", async () => {
        const newStatus = "IN-PROGRESS";
        this.req.body.status = newStatus;
        await this.controller.updateStatus(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });
      it("should test schedule update task", async () => {
        const newRemindDate = "11/01/2200 00:00:01";
        const newExpirationDate = "11/01/2200 00:00:02";
        this.req.body.remindDate = newRemindDate;
        this.req.body.expirationDate = newExpirationDate;
        await this.controller.updateSchedule(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.OK);
      });

      it("should test delete task", async () => {
        await this.controller.delete(this.req, this.res);
        assert.strictEqual(this.res.statusCode, StatusCodes.NO_CONTENT);
      });
    });
  }
}

function dependecyInjections() {
  Container.set(TaskMockPersistence, new TaskMockPersistence());
  Container.set(
    TaskController,
    new TaskController(Container.get(TaskMockPersistence))
  );
}

dependecyInjections();
const testClass = new TestTaskClass();
testClass.testControllers();
