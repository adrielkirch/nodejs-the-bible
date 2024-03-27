const { v4: uuidv4 } = require("uuid");
const redisClient = require("../db/db.redis");

const PLACE_KEY_PREFIX = "place:";

async function addPlace(name, latitude, longitude) {
  const id = uuidv4();

  await redisClient.geoadd(
    "locations",
    longitude,
    latitude,
    `${PLACE_KEY_PREFIX}${id}`
  );
  return { id, name, latitude, longitude };
}

async function getNearbyPlaces(latitude, longitude, radius) {
  const nearbyPlacesWithDistances = await redisClient.georadius(
    "locations",
    longitude,
    latitude,
    radius,
    "km",
    "WITHDIST",
    "ASC"
  );
  
  // Extracting place keys and distances
  const placeKeysWithDistances = nearbyPlacesWithDistances.map(([placeKey, distance]) => {
    return { placeKey, distance };
  });

  // Fetching latitude and longitude for each place key
  const placesWithLatLong = await Promise.all(placeKeysWithDistances.map(async ({ placeKey, distance }) => {
    const id = placeKey.substring(PLACE_KEY_PREFIX.length);
    console.log("id =>",id);
    const data = await redisClient.geopos("locations", placeKey);
    console.log(data)
    return { id, distance,data: data[0]};
  }));

  console.log(placesWithLatLong);
  return placesWithLatLong;
}

let name = "place1";
let latitude = 37.805186;
let longitude = -122.27652;
let radius = 100.0; // Fixed radius value

addPlace(name, latitude, longitude).then(() => {
  getNearbyPlaces(latitude, longitude, radius); // Corrected argument passing
});
