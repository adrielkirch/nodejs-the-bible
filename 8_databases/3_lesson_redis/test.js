const assert = require("assert");
const { StatusCodes } = require("http-status-codes");
const sinon = require("sinon");
const placeService = require("./services/service.place");
const {
  addPlace,
  updatePlace,
  deletePlace,
  getPlaceById,
} = require("./controllers/controller.place");

describe("Controllers", () => {
  describe("addPlace", () => {
    it("should return a new place on successful addition", async () => {
      const req = {
        body: {
          name: "Test Place",
          latitude: 40.7128,
          longitude: -74.006,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Mocking the behavior of the placeService.addPlace function for testing purposes
      const fakePlace = {
        id: "123",
        name: "Test Place",
        latitude: 40.7128,
        longitude: -74.006,
      };
      const addPlaceStub = sinon
        .stub(placeService, "addPlace")
        .resolves(fakePlace);

      // Call the function under test
      await addPlace(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.CREATED));
      assert(res.json.calledOnceWith(fakePlace));

      // Restore the original function to avoid affecting other tests
      addPlaceStub.restore();
    });
  });

  describe("getPlaceById", () => {
    it("should return a place by id", async () => {
      const req = {
        params: {
          id: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Mocking the behavior of the placeService.getPlaceById function for testing purposes
      const fakePlace = {
        id: "123",
        name: "Test Place",
        latitude: 40.7128,
        longitude: -74.006,
      };
      const getPlaceByIdStub = sinon
        .stub(placeService, "getPlaceById")
        .resolves(fakePlace);

      // Call the function under test
      await getPlaceById(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.OK));
      assert(res.json.calledOnceWith(fakePlace));

      // Restore the original function to avoid affecting other tests
      getPlaceByIdStub.restore();
    });
  });

  describe("getPlaceById", () => {
    it("should update a place by id", async () => {
      const req = {
        params: {
          id: "123",
        },
        body: {
          name: "Updated Place",
          latitude: 45.6789,
          longitude: -75.1234,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Mocking the behavior of the placeService.updatePlace function for testing purposes
      const updatedPlace = {
        id: "123",
        name: "Updated Place",
        latitude: 45.6789,
        longitude: -75.1234,
      };
      const updatePlaceStub = sinon
        .stub(placeService, "updatePlace")
        .resolves(updatedPlace);

      // Call the function under test
      await updatePlace(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.OK));
      assert(res.json.calledOnceWith(updatedPlace));

      updatePlaceStub.restore();
    });
  });

  describe("deletePlace", () => {
    it("should delete a place by id", async () => {
      const req = {
        params: {
          id: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Mocking the behavior of the placeService.deletePlace function for testing purposes
      const deletePlaceStub = sinon.stub(placeService, "deletePlace");

      // Call the function under test
      await deletePlace(req, res);

      // Assert the behavior
      assert(res.status.calledOnceWith(StatusCodes.NO_CONTENT));
      assert(res.json.calledOnce);

      // Restore the original function to avoid affecting other tests
      deletePlaceStub.restore();
    });
  });
});
