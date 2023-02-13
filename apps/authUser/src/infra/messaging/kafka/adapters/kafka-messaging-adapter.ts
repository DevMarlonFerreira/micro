import { MessagingAdapter } from "../../../../application/adapters/messaging-adapter";
import { producer } from "../producer";
import logger from '../../../../util/logger';

export class KafkaMessagingAdapter implements MessagingAdapter {
  async sendMessage(topic: string, message: any) {
    logger.info(`[Auth] New message on topic "${topic}"`);
    logger.info(JSON.stringify(message, null, 2));

    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
  }
}