import { Module } from '@nestjs/common';
import { EventProducerService } from './event-producer.service';

@Module({
  providers: [EventProducerService],
  exports: [EventProducerService],
})
export class EventProducerModule {}
