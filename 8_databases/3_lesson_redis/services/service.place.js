const placeRepository = require("../repositories/repository.place");

async function addPlace(name, latitude, longitude) {
  const place = await placeRepository.addPlace(name, latitude, longitude);
  return place;
}

async function deletePlace(id) {
  await placeRepository.deletePlace(id);
}

async function updatePlace(id, name, latitude, longitude) {
  await placeRepository.updatePlace(id, name, latitude, longitude);
}

async function getNearbyPlaces(latitude, longitude,radius) {
   places = await placeRepository.getNearbyPlaces(parseFloat(latitude), parseFloat(longitude), parseFloat(radius));
   return places
}

module.exports = {
  addPlace,
  deletePlace,
  updatePlace,
  getNearbyPlaces
};
