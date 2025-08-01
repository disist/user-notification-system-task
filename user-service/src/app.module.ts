import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { EventProducerModule } from './event-producer/event-producer.module';
import { UserNotificationModule } from './user-notification/user-notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    EventProducerModule,
    UserNotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
