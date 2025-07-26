import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitMQConfig } from 'config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, rabbitMQConfig());

  await app.listen();
}
void bootstrap();
