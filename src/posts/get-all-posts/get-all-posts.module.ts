// src/posts/get-all-posts/get-all-posts.module.ts
import { Module } from '@nestjs/common';
import { GetAllPostsResolver } from './get-all-posts.resolver';
import { GetAllPostsService } from './get-all-posts.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisModule } from '../../redis/redis.module'; 

@Module({
  imports: [RedisModule],
  providers: [GetAllPostsResolver, GetAllPostsService, PrismaService],
})
export class GetAllPostsModule {}
