import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { StorageModule } from 'src/storage/storage.module';
import { NotificationSchedulerService } from './notification-scheduler.service';

@Module({
  imports: [StorageModule],
  providers: [NotificationService, NotificationSchedulerService],
  controllers: [NotificationController],
})
export class NotificationModule {}
