import { Injectable, Logger } from '@nestjs/common';
import { NotificationSchedulerService } from './notification-scheduler.service';

const NOTIFICATION_DELAY_24H = 1000 * 60 * 60 * 24;

@Injectable()
export class NotificationService {
  private logger = new Logger('NotificationService');

  constructor(
    private notificationSchedulerService: NotificationSchedulerService,
  ) {}

  async handleUserCreated(userId: number, createdAt: Date) {
    this.logger.log(`User created with id: ${userId}`);

    const targetTimestamp =
      new Date(createdAt).getTime() + NOTIFICATION_DELAY_24H;
    const message = `Hello, user!. Let's return to the app!`;

    await this.notificationSchedulerService.scheduleNotification({
      userId,
      message,
      targetTimestamp,
    });
  }
}
