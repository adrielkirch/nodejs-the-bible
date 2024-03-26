const { v4: uuidv4 } = require("uuid");
const redisClient = require("../db/db.redis");

const PLACE_KEY_PREFIX = "place:";

async function addPlace(name, latitude, longitude) {
  const id = uuidv4();

  await redisClient.geoadd(
    `${PLACE_KEY_PREFIX}${id}`,
    longitude,
    latitude,
    name
  );
  return { id, name, latitude, longitude };
}

async function getNearbyPlaces(latitude, longitude, radius) {
  const nearbyPlaces = await redisClient.georadius(
    `${PLACE_KEY_PREFIX}*`, 
    longitude,
    latitude,
    radius,
    "m", 
    "WITHDIST", 
    "ASC" 
  );

  const formattedNearbyPlaces = nearbyPlaces.map(([placeKey, distance]) => {
    const id = placeKey.substring(PLACE_KEY_PREFIX.length);
    return { id, distance };
  });

  return formattedNearbyPlaces;
}
async function deletePlace(id) {
  const placeKey = `${PLACE_KEY_PREFIX}${id}`;
  await redisClient.del(placeKey);
  return true; 
}

module.exports = {
  addPlace,
  getNearbyPlaces,
  deletePlace
};
