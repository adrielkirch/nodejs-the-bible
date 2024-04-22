const { createServer } = require('http');
const BusinessError = require('./errors/businessError.js');
const statusCodes = require('./util/httpStatusCodes.js');

function validateHero(hero) {
  // Simulating a generic error to bring another scenario of unexpected error!

  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('error connecting to DB!');
  }

  if (hero.age < 20) {
    throw new BusinessError('age must be higher than 20!');
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('name length must be higher than 4!');
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);

      validateHero(hero);

      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(error.message);
        continue;
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log(`running at 3000`));

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}'
 */