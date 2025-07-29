import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { connect } from 'amqplib';
import { delayedExchangeConfig } from 'src/config/rabbitmq.config';

@Injectable()
export class EventProducerService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.ChannelModel;
  private channel: amqp.Channel;
  private logger = new Logger('EventProducerService');

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.connection = await connect(
      this.configService.get<string>('RABBITMQ_URL') || '',
    );
    this.channel = await this.connection.createChannel();
    this.logger.log('RabbitMQ connection established');
  }

  async emitDelayedEvent(routingKey: string, data: any, delay: number) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }

    await this.channel.assertExchange(
      delayedExchangeConfig.exchange,
      delayedExchangeConfig.exchangeType,
      {
        durable: true,
        arguments: delayedExchangeConfig.arguments,
      },
    );

    this.channel.publish(
      delayedExchangeConfig.exchange,
      routingKey,
      Buffer.from(JSON.stringify(data)),
      { headers: { 'x-delay': delay } },
    );

    this.logger.log(
      `Delayed event published to exchange '${delayedExchangeConfig.exchange}' with routing key '${routingKey}', delay: ${delay}ms`,
    );
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
    this.logger.log('RabbitMQ connection closed');
  }
}
