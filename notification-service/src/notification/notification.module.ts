import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventConsumerModule } from 'src/event-consumer/event-consumer.module';

@Module({
  imports: [EventConsumerModule],
  providers: [NotificationService],
})
export class NotificationModule {}
