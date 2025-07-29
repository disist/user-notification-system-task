import { Injectable } from '@nestjs/common';
import { EventProducerService } from 'src/event-producer/event-producer.service';

const USER_CREATED_ROUTING_KEY = 'user.created';
// const DELAY_2_MINUTES = 1000 * 60 * 2;
const DELAY_24_HOURS = 1000 * 60 * 60 * 24;

@Injectable()
export class UserNotificationService {
  constructor(private eventProducerService: EventProducerService) {}

  async scheduleUserNotification(userId: number): Promise<void> {
    await this.eventProducerService.emitDelayedEvent(
      USER_CREATED_ROUTING_KEY,
      { userId },
      DELAY_24_HOURS,
    );
  }
}
