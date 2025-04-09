import { Module } from '@nestjs/common';
import { DeletePostResolver } from './delete-post.resolver';
import { DeletePostService } from './delete-post.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [DeletePostResolver, DeletePostService, PrismaService],
})
export class DeletePostModule {}
