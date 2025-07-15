import { Module } from '@nestjs/common';
import { KafkaService } from './index';

@Module({
  providers: [KafkaService],
  exports: [KafkaService]
})
export class EventsModule {}