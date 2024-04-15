/**
 * Creates a data pipeline that reads input from the standard input stream (stdin),
 * pipes it to the standard output stream (stdout), and logs events related to the
 * standard output stream.
 *
 * The standard input stream (stdin) represents the input received from the terminal
 * or another input source. Data received on stdin is piped (forwarded) to the standard
 * output stream (stdout), which represents the output displayed in the terminal.
 *
 * This pipeline sets up event listeners on the standard output stream to handle
 * various events:
 * - 'data': Emitted when data is available to be read from the stdout stream. This event
 *           indicates that data has been received from stdin and is being forwarded to
 *           stdout. The received data is logged to the console.
 * - 'error': Emitted when an error occurs while writing to the stdout stream. The error
 *            message is logged to the console.
 * - 'end': Emitted when there is no more data to be written to the stdout stream.
 *          Indicates the end of the data stream.
 * - 'close': Emitted when the stdout stream is closed. Indicates the completion of
 *            the data transfer process.
 *
 * @examples
 */

// 1 Basic pipe

//process.stdin.pipe(process.stdout);

//2 The Process stdin has some events which msg is primarily as a Buffer

// process.stdin.pipe(process.stdout)
// .on('data', msg => console.log('data: ',msg));

//3 Buffer tostring()

// process.stdin.pipe(process.stdout)
// .on('data', msg => console.log('data: ', msg.toString()));

//4 Nodejs strems stdin events:

// process.stdin
//   .pipe(process.stdout)
//   .on("data", (msg) => {
//     console.log("data", msg.toString());
//   })
//   .on("error", (msg) => console.log("error", msg.toString()))
//   .on("end", (_) => console.log("end"))
//   .on("close", (_) => console.log("close"));

// Create a big file


import { createReadStream, statSync } from "fs";
import { createServer } from "http";

createServer((req, res) => {
  const stream = createReadStream("big.file");

  const { size: fileSize } = statSync("big.file");
  let totalBytes = 0;

  stream.on("data", (chunk) => {
    totalBytes += chunk.length;
    console.log(
      `Progress: ${totalBytes} bytes / ${fileSize} bytes (${Math.round(
        (totalBytes / fileSize) * 100
      )}%)`
    );
  });

  stream.pipe(res);
}).listen(3000, () => console.log("Server running at http://localhost:3000"));

//Run server to process a bigfile with:

//1 terminal
//node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

//1 terminal
//node native-stream.js

//2 terminal
//curl localhost:3000 -o output.txt

//delete both big files files
//sudo rm output.txt big.file
