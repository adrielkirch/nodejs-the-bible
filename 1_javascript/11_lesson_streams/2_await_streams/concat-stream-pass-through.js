const { Writable, PassThrough } = require("stream");
const axios = require("axios");

const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = async () => {
  const requests = await Promise.all([
    axios({
      method: "get",
      url: API_01,
      responseType: "stream",
    }),
    axios({
      method: "get",
      url: API_02,
      responseType: "stream",
    }),
  ]);

  const results = requests.map(({ data }) => data);
  const output = Writable({
    write(chunk, encoding, callback) {
      const data = chunk.toString();
      console.log(data);
      callback();
    },
  });
  // results[0].pipe(output);
  // results[1].pipe(output);

  merge(results).pipe(output);
};
//Goal is concat these strings
function merge(streams) {
  const mergedStream = new PassThrough();

  streams.forEach((stream, index) => {
    // Pipe the current stream to the mergedStream
    stream.pipe(mergedStream, { end: false });

    // When the current stream ends, check if all streams have ended
    stream.on("end", () => {
      // Check if all streams have ended
      const allEnded = streams.every((s) => s === stream || s.ended);

      if (allEnded) {
        // If all streams have ended, end the merged stream
        mergedStream.end();
      }
    });

    // Mark the stream as ended when it ends
    stream.on("end", () => {
      stream.ended = true;
    });
  });

  return mergedStream;
}

requests();
