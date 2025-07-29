import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { connect } from 'amqplib';
import { delayedExchangeConfig } from 'src/config/rabbitmq.config';

@Injectable()
export class EventConsumerService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.ChannelModel;
  private channel: amqp.Channel;
  private logger = new Logger('EventConsumerService');

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.connection = await connect(
      this.configService.get<string>('RABBITMQ_URL') || '',
    );
    this.channel = await this.connection.createChannel();
    this.logger.log('RabbitMQ connection established');
  }

  async subscribe(
    queueName: string,
    routingKey: string,
    onMessage: (data: { userId: number }) => void,
  ) {
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
    this.logger.log(`Exchange '${delayedExchangeConfig.exchange}' declared`);

    await this.channel.assertQueue(queueName, {
      durable: true,
    });
    this.logger.log(`Queue '${queueName}' declared`);

    await this.channel.bindQueue(
      queueName,
      delayedExchangeConfig.exchange,
      routingKey,
    );
    this.logger.log(
      `Queue '${queueName}' bound to exchange '${delayedExchangeConfig.exchange}' with routing key '${routingKey}'`,
    );

    await this.channel.consume(queueName, (msg) => {
      if (msg) {
        let data: { userId: number } | null = null;
        try {
          data = JSON.parse(msg.content.toString()) as { userId: number };
        } catch {
          data = null;
        }
        if (data) {
          this.logger.log(`Received message`);
          onMessage(data);
        }
        this.channel.ack(msg);
      }
    });
    this.logger.log(`Started consuming from queue '${queueName}'`);
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
    this.logger.log('RabbitMQ connection closed');
  }
}
