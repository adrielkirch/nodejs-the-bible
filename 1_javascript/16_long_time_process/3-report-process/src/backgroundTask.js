import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform, Writable } from 'stream';
import { setTimeout } from 'timers/promises';

import csvtojson from 'csvtojson';

const database = process.argv[2];

async function onMessage(message) {
  const firstTimeRan = [];

  await pipeline(
    createReadStream(database),
    csvtojson(),
    Transform({
      transform(chunk, enc, cb) {
        const data = JSON.parse(chunk);

        if (data.Name !== message.Name) {
          return cb();
        }

        if (firstTimeRan.includes(message.Name)) {
          return cb(null, message.Name);
        }

        firstTimeRan.push(message.Name);

        cb();
      }
    }),
    Writable({
      write(chunck, enc, cb) {
        if (!chunck) {
          return cb();
        }

        process.send(chunck.toString());

        cb();
      }
    })
  );
}

process.on('message', onMessage);


await setTimeout(10000);
process.channel.unref();