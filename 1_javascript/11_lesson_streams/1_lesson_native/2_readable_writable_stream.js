const { stdout } = require("process");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const { Readable, Writable, Transform } = require("stream");
const { createWriteStream } = require("fs");

// Create a readable stream as the source of data
const totalRows = 1e6
const readable = Readable({
  read() {
    for (let index = 0; index < totalRows; index++) {
      const person = {
        index: index,
        id: `${Date.now()}_${index}`,
        name: `Person ${index}`,
      };
      const personStr = JSON.stringify(person);
      this.push(personStr);
    }

    // Inform that data has ended
    this.push(null);
  },
});

// Data Process, Transform: mapFields
// This transform processes each chunk of data, parsing it as JSON, then mapping the 'id' and 'name' fields.
// It converts the 'name' field to uppercase and returns a new string with 'id' and uppercase 'name' separated by a comma and ending with a newline.
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    cb(null, result);
  },
});

// Data Process, Transform: mapHeaders
// This transform adds headers to the data stream. It adds "id,name" as the header if it's the first chunk (indicated by 'this.counter').
// Otherwise, it just passes the chunk through.
const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0; // Initialize counter if not set

    if (this.counter) {
      // If it's not the first chunk, just pass it through
      return cb(null, chunk);
    }

    // If it's the first chunk, prepend the headers "id,name" to the chunk
    this.counter += 1;
    cb(null, "id,name\n".concat(chunk));
  },
});
// Create a writable stream for data output
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log("msg ->", chunk.toString()); // Log the received data
    cb(); // Call the callback function to signal that the data has been processed
  },
});

// Pipe the readable stream to the writable stream
// readable.pipe(writable);

// Alternatively, you can pipe the readable stream directly to a destination, like process.stdout
// readable.pipe(process.stdout);


const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable);
  // .pipe(stdout);
  .pipe(createWriteStream(__dirname + "/tableStream1.csv"));

pipeline.on("end", () => {
  console.log(`Finished stream ${totalRows} rows.`);
});
