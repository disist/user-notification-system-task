import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UserNotificationService } from 'src/user-notification/user-notification.service';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    private prisma: PrismaService,
    private userNotificationService: UserNotificationService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      void this.userNotificationService.scheduleUserNotification(user.id);

      this.logger.log(`User created with ID: ${user.id}`);

      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error);
      throw error;
    }
  }
}
