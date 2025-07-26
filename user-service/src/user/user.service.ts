import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { ProducerService } from 'src/producer/producer.service';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    private prisma: PrismaService,
    private producerService: ProducerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    this.producerService.emit('user.created', {
      userId: user.id,
      createdAt: user.createdAt,
      name: user.name,
    });

    this.logger.log(`User created with ID: ${user.id}`);

    return user;
  }
}
