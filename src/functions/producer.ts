import { LibrdKafkaError, DeliveryReport, Producer } from "node-rdkafka";
import { IKafkaConfig } from "../types/IKafkaConfig";
import Kafka from 'node-rdkafka';

export async function createProducer(kafkaProducer: typeof Kafka.Producer, config: IKafkaConfig): Promise<Producer> {
  const producer = new kafkaProducer({
    'bootstrap.servers': config.bootstrap.servers,
    'sasl.username': config.sasl.username,
    'sasl.password': config.sasl.password,
    'security.protocol': config.security.protocol,
    'sasl.mechanisms': config.sasl.mechanisms,
    'dr_msg_cb': true
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryCallback)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

function onDeliveryCallback(err: LibrdKafkaError, report: DeliveryReport): void {
  if (err) {
    console.warn('Error producing', err)
  } else {
    const { topic, partition, value } = report;
    console.log(`Successfully produced record to topic "${topic}" partition ${partition} ${value}`);
  }
}
