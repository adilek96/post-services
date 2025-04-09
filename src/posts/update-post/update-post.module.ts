import { Module } from '@nestjs/common';
import { UpdatePostService } from './update-post.service';
import { UpdatePostResolver } from './update-post.resolver';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  providers: [UpdatePostService, UpdatePostResolver, PrismaService],
})
export class UpdatePostModule {}
