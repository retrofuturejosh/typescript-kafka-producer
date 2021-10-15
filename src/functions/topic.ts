import Kafka, { IAdminClient } from "node-rdkafka";
import { IKafkaConfig } from "../types/IKafkaConfig";
const ERR_TOPIC_ALREADY_EXISTS: number = 36;

export async function ensureTopicExists(kafkaAdminClient: typeof Kafka.AdminClient, config: IKafkaConfig) {
  const adminClient: IAdminClient = kafkaAdminClient.create({
    'bootstrap.servers': config.bootstrap.servers,
    'sasl.username': config.sasl.username,
    'sasl.password': config.sasl.password,
    'security.protocol': config.security.protocol,
    'sasl.mechanisms': config.sasl.mechanisms,
  });

  return new Promise((resolve, reject) => {
    adminClient.createTopic({
      topic: config.topic,
      num_partitions: 1,
      replication_factor: 3
    }, (err) => {
      if (!err) {
        console.log(`Created topic ${config.topic}`);
        return resolve("success");
      }

      if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
        console.log(`Topic ${config.topic} exists`);
        return resolve("error");
      }

      return reject(err);
    });
  });
}
