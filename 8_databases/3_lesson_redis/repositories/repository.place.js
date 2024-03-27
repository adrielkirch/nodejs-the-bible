const redisClient = require("../db/db.redis");

const PLACE_KEY_PREFIX = "place:";
const LIST = "locations"

async function addPlace(id, latitude, longitude) {
  await redisClient.geoadd(
    LIST,
    longitude,
    latitude,
    `${PLACE_KEY_PREFIX}${id}`
  );
  return { id, latitude, longitude };
}

async function getNearbyPlaces(latitude, longitude, radius) {
  const nearbyPlacesWithDistances = await redisClient.georadius(
    LIST,
    longitude,
    latitude,
    radius,
    "km",
    "WITHDIST",
    "ASC"
  );

  const placeKeysWithDistances = nearbyPlacesWithDistances.map(
    ([placeKey, distance]) => {
      return { placeKey, distance };
    }
  );

  const placesWithLatLong = await Promise.all(
    placeKeysWithDistances.map(async ({ placeKey, distance }) => {
      const id = placeKey.substring(PLACE_KEY_PREFIX.length);
      const location = await redisClient.geopos(LIST, placeKey);
      return { id, distance, location: location[0] };
    })
  );

  return placesWithLatLong;
}
async function deletePlace(id) {
  const placeKey = `${PLACE_KEY_PREFIX}${id}`;
  await redisClient.del(placeKey);
  return true;
}

async function updatePlace(id, newLatitude, newLongitude) {
  const placeKey = `${PLACE_KEY_PREFIX}${id}`;

  await redisClient.del(placeKey);

  await redisClient.geoadd(
    LIST,
    longitude,
    latitude,
    `${PLACE_KEY_PREFIX}${id}`
  );

  return {
    id: id,
    latitude: newLatitude,
    longitude: newLongitude,
  };
}

module.exports = {
  addPlace,
  getNearbyPlaces,
  deletePlace,
  updatePlace,
};
