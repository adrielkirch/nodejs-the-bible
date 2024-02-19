const http = require("http");

/**
 * Fetches data from the specified URL using HTTP GET request.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves with the fetched data, or rejects with an error.
 */
function fetchData(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error("Failed to parse JSON"));
          }
        });
      })
      .on("error", (error) => {
        reject(new Error(`Error fetching data: ${error.message}`));
      });
  });
}

// URLs of public APIs to fetch data from
const urls = [
  "http://jsonplaceholder.typicode.com/posts/1",
  "http://jsonplaceholder.typicode.com/posts/2",
  "http://jsonplaceholder.typicode.com/posts/3",
];

console.table(urls);

const promises = urls.map((url) => fetchData(url));

// Using Promise.all to fetch data from multiple APIs concurrently, for each Promise will be stored in an Array of Objects order by first resolved
Promise.all(promises)
  .then((results) => {
    // All promises have resolved successfully
    console.log("Promise.all:", results);
  })
  .catch((error) => {
    // At least one promise has rejected
    console.error("Promise.all Error:", error);
  });

// Using Promise.race to fetch data from multiple APIs and resolve with the result of the first resolved promise
Promise.race(promises)
  .then((result) => {
    // The first promise has resolved
    console.log("Promise.race:", result);
  })
  .catch((error) => {
    // The first promise has rejected
    console.error("Promise.race Error:", error);
  });

// Using Promise.any to fetch data from multiple APIs and resolve with the result of the first resolved promise, or reject if all promises reject
Promise.any(promises)
  .then((result) => {
    // At least one promise has resolved
    console.log("Promise.any:", result);
  })
  .catch((error) => {
    // All promises have rejected
    console.error("Promise.any Error:", error);
  });

// Using Promise.resolve to create a resolved promise with a specific value
const resolvedPromise = Promise.resolve("Resolved value");
console.log("Promise.resolve:", resolvedPromise);

// Using Promise.reject to create a rejected promise with a specific reason
//const rejectedPromise = Promise.reject(new Error("Rejected reason"));
//console.log("Promise.reject:", rejectedPromise);

