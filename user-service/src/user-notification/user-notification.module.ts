import { Module } from '@nestjs/common';
import { UserNotificationService } from './user-notification.service';
import { EventProducerModule } from 'src/event-producer/event-producer.module';

@Module({
  imports: [EventProducerModule],
  providers: [UserNotificationService],
  exports: [UserNotificationService],
})
export class UserNotificationModule {}
