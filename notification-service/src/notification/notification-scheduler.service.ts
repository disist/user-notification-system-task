import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StorageService } from 'src/storage/storage.service';
import { NotificationData } from './notification.model';
import axios from 'axios';

@Injectable()
export class NotificationSchedulerService {
  private logger = new Logger('NotificationSchedulerService');

  constructor(private readonly storageService: StorageService) {}

  async scheduleNotification(notificationData: NotificationData) {
    await this.storageService.add(
      'notifications',
      notificationData.targetTimestamp,
      JSON.stringify(notificationData),
    );

    this.logger.log(
      `Notification scheduled for user id ${notificationData.userId}`,
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledNotifications() {
    const notifications = await this.storageService.getByRange(
      'notifications',
      0,
      Date.now(),
    );

    if (notifications.length === 0) return;

    for (const rawNotification of notifications) {
      const notificationData = JSON.parse(rawNotification) as NotificationData;

      void this.sendPushNotification(notificationData).then(() =>
        this.storageService.remove('notifications', rawNotification),
      );
    }
  }

  async sendPushNotification(notificationData: NotificationData) {
    await axios.post(
      'https://webhook.site/08e792b6-358d-40ca-881b-0f12b1cffa2c',
      {
        userId: notificationData.userId,
        message: notificationData.message,
      },
    );

    this.logger.log(`Push sent to user ${notificationData.userId}`);
  }
}
