import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class StorageService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      url: this.configService.get<string>('REDIS_URL') || '',
    });
    await this.client.connect();
  }

  async add(pattern: string, score: number, value: string) {
    return this.client.zAdd(pattern, {
      score,
      value,
    });
  }

  async getByRange(
    pattern: string,
    start: number,
    end: number,
    limitCount = 1000,
  ) {
    return this.client.zRangeByScore(pattern, start, end, {
      LIMIT: { offset: 0, count: limitCount },
    });
  }

  async remove(pattern: string, value: string | string[]) {
    return this.client.zRem(pattern, value);
  }

  onModuleDestroy() {
    this.client.destroy();
  }
}
