const dotenv = require("dotenv");
dotenv.config();
const assert = require("assert");
const { StatusCodes } = require("http-status-codes");
const sinon = require("sinon");
const userService = require("./services/service.user");
const { signup, login, getById, deleteById, update } = require("./controllers/controller.user");

/**
 * Test definitions
 *
 * Mock: A mock is an object that mimics the behavior of a real object or system.
 * It allows you to simulate the behavior of real objects in a controlled way
 * and is often used in testing to replace real dependencies with predictable
 * behavior for testing purposes.
 *
 * Stub: A stub is a function or object that replaces a real component or dependency in a test.
 * It allows you to control the behavior of the replaced component and define specific return values
 * or actions to be taken when the replaced function or method is called.
 * Stubs are commonly used in testing to isolate the code under test from its dependencies and
 * to create predictable test scenarios.
 *
 * Spies: A spy is a function or object that records information about function calls made during the test.
 * It allows you to monitor how functions are used, including how many times they are called, with which
 * arguments, and what values they return. Spies are useful for verifying that certain functions are
 * called or for inspecting the behavior of functions in the code under test.
 */

describe("Controllers", () => {
  describe("signup", () => {
    it("should return a new user on successful signup", async () => {
      const req = {
        body: {
          email: "test@example.com",
          name: "Test User",
          password: "password",
        },
      };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Mocking the behavior of the userService.signup function for testing purposes
      const fakeUser = {
        id: 123,
        email: "test@example.com",
        name: "Test User",
      };

      // Creating a stub to replace the userService.signup function during testing
      const signupStub = sinon.stub(userService, "signup").resolves(fakeUser);

      // Call the function under test
      await signup(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.CREATED));
      assert(res.json.calledOnceWith(fakeUser));

      // Restore the original function to avoid affecting other tests
      signupStub.restore();
    });
  });

  describe("login", () => {
    it("should return an user on successful login", async () => {
      const req = { body: { email: "test@example.com", password: "password" } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Mocking the behavior of the userService.login function for testing purposes
      const fakeUser = {
        id: 123,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      };

      // Creating a stub to replace the userService.login function during testing
      const loginStub = sinon.stub(userService, "login").resolves(fakeUser);

      // Call the function under test
      await login(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.OK));
      assert(res.json.calledOnceWith(fakeUser));

      // Restore the original function to avoid affecting other tests
      loginStub.restore();
    });
  });

  describe("getById", () => {
    it("should return an user by _id", async () => {
      const req = { user: "user_id" };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Creating a stub to replace the userService.getById function during testing
      const fakeUser = {
        id: "user_id",
        email: "test@example.com",
        name: "Test User",
      };
      const getByIdStub = sinon.stub(userService, "getById").resolves(fakeUser);

      // Call the function under test
      await getById(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.OK));
      assert(res.json.calledOnceWith(fakeUser));

      // Restoring the original function to avoid affecting other tests
      getByIdStub.restore();
    });
  });

  describe("deleteById", () => {
    it("should delete an user by _id", async () => {
      const req = { user: "user_id" };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Creating a stub to replace the userService.deleteById function during testing
      const deleteByIdStub = sinon.stub(userService, "deleteById");

      // Call the function under test
      await deleteById(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.NO_CONTENT));
      assert(res.json.calledOnce);

      // Restoring the original function to avoid affecting other tests
      deleteByIdStub.restore();
    });
  });

  describe("update", () => {
    it("should update an user name by _id", async () => {
      const req = { body: { user: "user_id", name: "new_name" } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Creating a stub to replace the userService.update function during testing
      const updateStub = sinon.stub(userService, "update").resolves(true); // Stub resolves with true for success

      // Call the function under test
      await update(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.OK));
      assert(res.json.calledOnce);

      // Restoring the original function to avoid affecting other tests
      updateStub.restore();
    });
  });
});
