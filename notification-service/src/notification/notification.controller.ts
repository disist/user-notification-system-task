import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @MessagePattern('user.created')
  getNotifications(
    @Payload() data: { userId: number; createdAt: Date; name: string },
  ) {
    void this.notificationService.handleUserCreated(
      data.userId,
      data.createdAt,
    );
  }
}
