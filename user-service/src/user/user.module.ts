import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserNotificationModule } from 'src/user-notification/user-notification.module';

@Module({
  imports: [PrismaModule, UserNotificationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
