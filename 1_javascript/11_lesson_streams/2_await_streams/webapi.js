const http = require("http");
const { Readable } = require("stream");
const { fileURLToPath } = require("url");
const { dirname } = require("path");


function runApi(apiFunction, port) {
  http.createServer(apiFunction).listen(port, () =>
    console.log(`listening on port ${port}`)
  );
}

function createApi(request, response) {
  let count = 0;
  const maxItems = 99;
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Ciclano - ${count}`,
            })
          );

          this.push("\n");
          return;
        }
        clearInterval(intervalContext);
        this.push(null);
      };

      setInterval(() => {
        everySecond(this);
      }, 1000);
    },
  });
  readable.pipe(response);
}

function createApi2(request, response) {
  let count = 0;
  const maxItems = 99;
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Fulano - ${count}`,
            })
          );

          this.push("\n");
          return;
        }
        clearInterval(intervalContext);
        this.push(null);
      };

      setInterval(() => {
        everySecond(this);
      }, 1000);
    },
  });
  readable.pipe(response);
}

//node webapi.js api1 3000
//node webapi.js api2 4000
// Run the API based on the argument passed
const apiToRun = process.argv[2]; // Get the API from the command line arguments
const port = process.argv[3]; // Get the port from the command line arguments

if (apiToRun === "api1") {
  runApi(createApi, port);
} else if (apiToRun === "api2") {
  runApi(createApi2, port);
} else {
  console.log("Invalid API name. Please provide 'api1' or 'api2' as the first argument.");
}
