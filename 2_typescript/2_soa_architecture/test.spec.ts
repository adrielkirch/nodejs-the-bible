import dotenv from "dotenv";
dotenv.config();
import * as assert from "assert";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";
import UserService  from "./services/service.user";

const userService = new UserService()
const userData: any = {
  "email": "adrielkirch1@gmail.com",
  "password": "Roadr2024@",
  "name": "adrielkirch1@gmail.com"
} as any;

describe("Test service class", () => {
  let mongoServer: MongoMemoryServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connect(uri, {});
  });
  after(async () => {
    await connection.close();
    await mongoServer.stop();
  });

  it("should sign up return it", async () => {
    const insertedUser = await userService.signup(userData.email,userData.name,userData.password);
    userData._id = insertedUser._id.toString();
    assert.strictEqual(typeof userData._id, "string");
    assert.strictEqual(userData._id.length, 24);
  });

  it("should login and return it", async () => {
    const loginData = await userService.login(userData.email,userData.password);
    console.log(loginData)
    assert.strictEqual(loginData._id.toString().length, 24);
    assert.strictEqual(loginData.token.length, 151);
  });
});
