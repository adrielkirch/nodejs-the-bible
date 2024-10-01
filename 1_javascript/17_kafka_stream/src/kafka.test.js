const { KafkaSingleton } = require('./kafka');

async function testKafka() {
    const kafkaInstance = new KafkaSingleton();
    kafkaInstance.createTopics(['fleet', 'location']);
    await kafkaInstance.init();

    const message = JSON.stringify({ vehicleId: '1234', status: 'active' });

    const fleetConsumer = kafkaInstance.getConsumer('fleet');

    fleetConsumer.subscribe({
        next: (msg) => {
            console.log(`Received message from 'fleet' topic: ${msg}`);
        },
        error: (err) => {
            console.error('Error in consumer:', err);
        },
        complete: () => {
            console.log('Consumer completed');
        }
    });

    await kafkaInstance.produceMessage('fleet', message);
    await kafkaInstance.produceMessage('fleet', message);
    await kafkaInstance.produceMessage('fleet', message);
}

testKafka().catch(err => console.error('Error in testKafka:', err));