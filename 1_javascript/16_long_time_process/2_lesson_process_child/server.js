import { createServer } from 'http';
import { randomUUID } from 'crypto';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';

const SERVER_PORT = 3000;

async function handler(request, response) {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(
    request,
    createWriteStream(fileName)
  );

  response.end('uploaded with success!');
}

createServer(handler).listen(SERVER_PORT, () => console.log(`running at ${SERVER_PORT}`));