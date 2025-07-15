import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Use require instead of import for KafkaJS
const kafkajs = require('kafkajs');

@Injectable()
export class KafkaService {
  private kafka: any;
  private producer: any;
  private consumer: any;

  constructor(private configService: ConfigService) {}

  async connect() {
    // Initialize Kafka connection
    this.kafka = new kafkajs.Kafka({
      clientId: this.configService.get('KAFKA_CLIENT_ID', 'socialpass-app'),
      brokers: this.configService.get<string>('KAFKA_BROKERS', 'localhost:9092')
        .split(',')
        .map(b => b.trim()),
      ssl: this.configService.get('KAFKA_SSL') === 'true',
      sasl: this.configService.get('KAFKA_USERNAME') ? {
        mechanism: 'plain',
        username: this.configService.get('KAFKA_USERNAME'),
        password: this.configService.get('KAFKA_PASSWORD')
      } : undefined
    });

    // Create producer and consumer instances
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: this.configService.get('KAFKA_GROUP_ID', 'socialpass-group')
    });

    // Connect to Kafka
    await this.producer.connect();
    await this.consumer.connect();
    console.log('Connected to Kafka');
    return this;
  }

  async disconnect() {
    // Graceful shutdown
    await this.producer.disconnect();
    await this.consumer.disconnect();
    console.log('Disconnected from Kafka');
  }

  // Producer methods
  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    });
  }

  // Consumer methods
  async subscribe(topic: string, callback: (message: any) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          callback(JSON.parse(message.value.toString()));
        }
      }
    });
  }
}