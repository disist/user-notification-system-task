import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/config/rabbitmq.config';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQConfig());
  }

  emit(eventName: string, data: any) {
    this.client.emit(eventName, data);
  }
}
