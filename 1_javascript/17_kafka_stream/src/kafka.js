const { Kafka, Partitioners } = require("kafkajs");
const { Subject } = require("rxjs");
const EventEmitter = require('events');

class KafkaSingleton extends EventEmitter {
  constructor() {
    super();
    if (!KafkaSingleton.instance) {
      this.kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092", "host.docker.internal:29092"], // Updated brokers
      });

      this.producer = this.kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
      });
      this.consumers = {};
      this.isInitialized = false;
      KafkaSingleton.instance = this;
    }

    return KafkaSingleton.instance;
  }

  async init() {
    if (this.isInitialized) {
      return;
    }
    await this.producer.connect();
    this.isInitialized = true;
    console.log("Kafka initialized");
  }

  async createTopics(topics) {
    const admin = this.kafka.admin();
    await admin.connect();

    const existingTopics = await admin.listTopics();
    const topicsToCreate = topics.filter(
      (topic) => !existingTopics.includes(topic)
    );

    if (topicsToCreate.length > 0) {
      await admin.createTopics({
        topics: topicsToCreate.map((topic) => ({ topic })),
      });
      console.log(`Topics created: ${topicsToCreate.join(", ")}`);
    } else {
      console.log("All topics already exist.");
    }

    await admin.disconnect();
  }

  async produceMessage(topic, message) {
    if (!this.isInitialized) {
      throw new Error("Kafka instance is not initialized");
    }
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent to topic "${topic}": ${message}`);
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.retriable) {
        console.log("Retrying to send message...");
        await this.producer.connect();
        await this.produceMessage(topic, message);
      }
    }
  }

  getConsumer(topic) {
    if (!this.consumers[topic]) {
      const consumer = this.kafka.consumer({ groupId: "test-group" });

      consumer
        .connect()
        .then(() => {
          console.log(`Consumer connected for topic: ${topic}`);
          return consumer.subscribe({ topic, fromBeginning: true });
        })
        .then(() => {
          return consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              const msgValue = message.value.toString();
              this.emit('message', { topic, message: msgValue });
            },
          });
        })
        .catch((err) => console.error("Error in consumer:", err));

      this.consumers[topic] = consumer;
    }
  }
}

module.exports = {
  KafkaSingleton,
};