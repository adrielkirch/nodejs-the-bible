/**
 * Asynchronous Streams Example
 *
 * This script demonstrates the use of Node.js streams and async iterators
 * to create custom asynchronous streams and chain them together using the
 * pipeline function.
 *
 * - myCustomIterableReadable:
 *   - A custom async iterable generator that yields chunks of data.
 *   - Yields two buffers: "this is my" and "custom readable".
 *   - Simulates an asynchronous delay using setTimeout.
 *
 * - myCustomIterableTransform:
 *   - A custom async iterable generator that transforms incoming chunks of data.
 *   - Replaces whitespace characters with underscores.
 *
 * - myCustomIterableDuplex:
 *   - A custom async iterable generator that acts as a duplex stream.
 *   - Reads chunks from the input stream, logs them, and accumulates them into an array.
 *   - Yields two strings: one representing the concatenated chunks and another representing the total bytes read.
 *
 * - myCustomIterableWritable:
 *   - A custom async iterable generator that logs each incoming chunk of data.
 *
 * - pipeline:
 *   - Chains together the custom streams.
 *   - Inputs are passed from myCustomIterableReadable through myCustomIterableTransform,
 *     then through myCustomIterableDuplex, and finally to myCustomIterableWritable.
 *
 * - Process Completion:
 *   - After the pipeline has completed, the "Process has finished!" message is logged.
 */
import { setTimeout } from "timers/promises";
import { pipeline } from "stream/promises";

/**
 * Asynchronous Readable Stream
 *
 * This function defines a custom async iterable generator that yields chunks of data.
 *
 * @returns {AsyncIterable<Buffer>} An async iterable generator representing a readable stream.
 */
async function* myCustomIterableReadable() {
  yield Buffer.from("this is my");
  await setTimeout(100); // Simulates an asynchronous delay
  yield Buffer.from("custom readable");
}

/**
 * Asynchronous Transform Stream
 *
 * This function defines a custom async iterable generator that transforms incoming chunks of data.
 *
 * @param {AsyncIterable<Buffer>} stream - The input stream to be transformed.
 * @returns {AsyncIterable<string>} An async iterable generator representing a transform stream.
 */
async function* myCustomIterableTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_"); // Replaces whitespace characters with underscores
  }
}

/**
 * Asynchronous Duplex Stream
 *
 * This function defines a custom async iterable generator that acts as a duplex stream.
 *
 * @param {AsyncIterable<Buffer>} stream - The input stream to be processed.
 * @returns {AsyncIterable<string>} An async iterable generator representing a duplex stream.
 */
async function* myCustomIterableDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];

  // Iterate over the input stream asynchronously
  for await (const chunk of stream) {
    console.log(`[duplex writable] ${chunk}`);
    bytesRead += chunk.length;
    wholeString.push(chunk);
  }

  // Yield the accumulated chunks as a single string
  yield `wholeString ${wholeString.join()}`;

  // Yield the total bytes read as a string
  yield `bytesRead ${wholeString.join()}`;
}

/**
 * Asynchronous Writable Stream
 *
 * This function defines a custom async iterable generator that logs each incoming chunk of data.
 *
 * @param {AsyncIterable<Buffer>} stream - The input stream to be processed.
 * @returns {AsyncIterable<void>} An async iterable generator representing a writable stream.
 */
async function* myCustomIterableWritable(stream) {
  // Iterate over the input stream asynchronously
  for await (const chunk of stream) {
    console.log(`[writable] ${chunk}`);
  }
}

try {
  const controller = new AbortController();
  setImmediate(() => {
    controller.abort();
  });
  await pipeline(
    myCustomIterableReadable,
    myCustomIterableTransform,
    myCustomIterableDuplex,
    myCustomIterableWritable,
    { signal: controller.signal }
  );
  console.log("Process has finished!");
} catch (error) {
  console.error("\nAbort", error.message);
}
