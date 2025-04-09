// src/redis/redis.module.ts

import { Module } from '@nestjs/common';
import { RedisModule as RedisCoreModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisCoreModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      options: { password: process.env.REDIS_PASSWORD },
    }),
  ],
  exports: [RedisCoreModule],
})
export class RedisModule {}
