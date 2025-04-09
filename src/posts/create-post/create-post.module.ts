import { Module } from '@nestjs/common';
import { PostsService } from './create-post.service';
import { PostsResolver } from './create-post.resolver';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
