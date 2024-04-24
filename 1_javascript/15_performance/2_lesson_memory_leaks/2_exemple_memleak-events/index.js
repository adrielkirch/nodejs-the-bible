import { createServer } from 'http';
import Events from 'events';
import { randomBytes } from 'crypto';


/*
Use three terminal:

terminal 1 (server):
CLIMEM=8999 node -r climem index.js 
or
npx 0x -- node index.js
or
npx clinic doctor -- node index.js
or
npx clinic flame -- node index.js
or
npx clinic heapprofiler -- node index.js

terminal 2 (trigger thousands of request):
npm i -D autocannon
npm i -D 0x
npx autocannon -c 100 -d 30 -p 10 http://localhost:3000

terminal 3 (only for climen server):
npx climem 8999
*/


const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

const PORT = 3000;

function onData() {
  getBytes();
  const items = [];

  setInterval(function myInterval() { items.push(Date.now()) });
}


createServer(function handler(request, response) {
  myEvent.on('data', onData);
  getBytes();
  myEvent.emit('data', Date.now());
  response.end('OK\n');
})
  .listen(PORT, () => console.log(`running at ${PORT}`));