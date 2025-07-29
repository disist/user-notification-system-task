import { Module } from '@nestjs/common';
import { EventConsumerService } from './event-consumer.service';

@Module({
  providers: [EventConsumerService],
  exports: [EventConsumerService],
})
export class EventConsumerModule {}
