const placeRepository = require("../repositories/repository.place"); 


async function addPlace(name, latitude, longitude) {
  const place = await placeRepository.addPlace(name, latitude, longitude);
  return place;
}

async function deletePlace(id) {
  await placeRepository.deletePlace(id);
}

module.exports = {
  addPlace,
  deletePlace,
};
