import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export class SocialQueue {
  static createQueue(config: ConfigService) {
    return {
      transport: Transport.RMQ, // Or Transport.KAFKA if using Kafka
      options: {
        urls: [config.get('QUEUE_URL')],
        queue: config.get('QUEUE_NAME', 'socialpass_queue'),
        queueOptions: {
          durable: true,
        },
        // For Kafka:
        // client: {
        //   brokers: [config.get('KAFKA_BROKER')],
        // },
        // consumer: {
        //   groupId: config.get('KAFKA_GROUP_ID', 'socialpass-group'),
        // },
      },
    };
  }
}

// Export for DI if needed elsewhere
export { SocialQueue as QueueService };