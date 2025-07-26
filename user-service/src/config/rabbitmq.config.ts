import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitMQConfig = (): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || ''],
      queue: 'user-queue',
      queueOptions: {
        durable: false,
      },
    },
  };
};
