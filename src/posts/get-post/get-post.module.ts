import { Module } from '@nestjs/common';
import { GetPostService } from './get-post.service';
import { GetPostResolver } from './get-post.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    providers: [GetPostResolver, GetPostService, PrismaService],
})
export class GetPostModule {}
