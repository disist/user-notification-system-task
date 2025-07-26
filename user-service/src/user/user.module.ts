import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProducerModule } from 'src/producer/producer.module';

@Module({
  imports: [PrismaModule, ProducerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
