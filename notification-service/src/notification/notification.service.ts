import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { NotificationData } from './notification.model';
import { EventConsumerService } from 'src/event-consumer/event-consumer.service';

const USER_CREATED_QUEUE = 'user.created.queue';
const USER_CREATED_ROUTING_KEY = 'user.created';

@Injectable()
export class NotificationService {
  private logger = new Logger('NotificationService');

  constructor(private eventConsumerService: EventConsumerService) {}

  onModuleInit() {
    void this.eventConsumerService.subscribe(
      USER_CREATED_QUEUE,
      USER_CREATED_ROUTING_KEY,
      (data: { userId: number }) => {
        void this.handleUserCreated(data.userId);
      },
    );
  }

  async handleUserCreated(userId: number) {
    this.logger.log(`Handling user created event for user ID: ${userId}`);

    const message = `Hello, user!. Let's return to the app!`;
    await this.sendPushNotification({
      userId,
      message,
    });
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
