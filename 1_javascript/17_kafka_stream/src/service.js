const { KafkaSingleton } = require('./kafka');
const EventEmitter = require('events');

const kafkaInstance = new KafkaSingleton();
const eventEmitter = new EventEmitter();


eventEmitter.on('location', async (data) => {
   kafkaInstance.produceMessage('fleet', JSON.stringify(data));
});

async function produceLocation(latitude, longitude, status, companyId, companyName) {

  const data = {
    latitude, longitude, status, companyId, companyName
  };

  eventEmitter.emit('location', data);
}

module.exports = {
  produceLocation,
};