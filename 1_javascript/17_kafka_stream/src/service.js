const { KafkaSingleton } = require('./kafka');
const EventEmitter = require('events');

const kafkaInstance = new KafkaSingleton();
const eventEmitter = new EventEmitter();


eventEmitter.on('location', async (data) => {
   kafkaInstance.produceMessage('fleet', JSON.stringify(data));
});

async function produceLocation(latitude, longitude, status, roomId, companyName) {

  const data = {
    latitude, longitude, status, roomId, companyName
  };

  eventEmitter.emit('location', data);
}

module.exports = {
  produceLocation,
};