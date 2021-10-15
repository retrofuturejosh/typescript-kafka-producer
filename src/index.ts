import 'dotenv/config';
import Kafka, { Producer } from 'node-rdkafka';

import { ensureTopicExists } from './functions/topic';
import { createProducer } from './functions/producer';

import config from './config';

async function produceExample(): Promise<void> {
  console.log("Let's create some records, shall we?");

  await ensureTopicExists(Kafka.AdminClient, config);

  const producer: Producer = await createProducer(Kafka.Producer, config);

  // create record every 10 seconds, increment the count with each message
  let count: number = 0;
  setInterval((): void => {
    const key: string = 'testKey';
    const value: Buffer = Buffer.from(JSON.stringify({ count: count++ }));
    console.log(`Producing record ${key}\t${value}`);
    producer.produce(config.topic, -1, value, key, Date.now());
  }, 10000)

}

produceExample();
