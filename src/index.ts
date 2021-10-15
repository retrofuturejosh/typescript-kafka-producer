import 'dotenv/config';
import Kafka, { Producer } from 'node-rdkafka';

import { ensureTopicExists } from './functions/topic';
import { createProducer } from './functions/producer';

import config from './config';

async function produceExample(): Promise<void> {
  console.log("Let's create 10 test records, shall we?");

  await ensureTopicExists(Kafka.AdminClient, config);

  const producer: Producer = await createProducer(Kafka.Producer, config);

  for (let idx = 0; idx < 10; ++idx) {
    const key: string = 'testKey';
    const value: Buffer = Buffer.from(JSON.stringify({ count: idx }));

    console.log(`Producing record ${key}\t${value}`);

    producer.produce(config.topic, -1, value, key);
  }

  producer.flush(10000, () => {
    producer.disconnect();
  });
}

produceExample();
