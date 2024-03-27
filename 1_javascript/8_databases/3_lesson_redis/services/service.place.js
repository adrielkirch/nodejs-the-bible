const placeRepository = require("../repositories/repository.place");

async function addPlace(id, latitude, longitude) {
  const place = await placeRepository.addPlace(id, latitude, longitude);
  return place;
}

async function deletePlace(id) {
  await placeRepository.deletePlace(id);
}

async function updatePlace(id, latitude, longitude) {
  await placeRepository.updatePlace(id, latitude, longitude);
}

async function getNearbyPlaces(latitude, longitude, radius) {
  places = await placeRepository.getNearbyPlaces(
    parseFloat(latitude),
    parseFloat(longitude),
    parseFloat(radius)
  );
  return places;
}

module.exports = {
  addPlace,
  deletePlace,
  updatePlace,
  getNearbyPlaces,
};
