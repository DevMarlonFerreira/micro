import { kafka } from "./kafka";
import logger from '../../../util/logger';

export const producer = kafka.producer({
  allowAutoTopicCreation: true,
})

producer.connect().then(() => {
  logger.info('[Auth] Kafka producer connected');
})

