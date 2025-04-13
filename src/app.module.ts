import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostsModule } from './posts/create-post/create-post.module';
import { PrismaService } from 'prisma/prisma.service';
import { AppResolver } from './app.resolver';
import { GetPostModule } from './posts/get-post/get-post.module';
import { DeletePostModule } from './posts/delete-post/delete-post.module';
import { UpdatePostModule } from './posts/update-post/update-post.module';
import { GetAllPostsModule } from './posts/get-all-posts/get-all-posts.module';
import { RedisModule } from './redis/redis.module'; 
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma/prisma.health';
import { HttpModule } from '@nestjs/axios';



@Module({
  imports: [ 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, 
      debug: false,
  }),
    ConfigModule.forRoot({
      isGlobal: true,
  }),
    PostsModule,
    GetPostModule,
    DeletePostModule,
    UpdatePostModule,
    GetAllPostsModule,
    RedisModule,
    TerminusModule,
    HttpModule,
    
],
  
  controllers: [HealthController],
  providers: [PrismaService, AppResolver, PrismaHealthIndicator],
  exports: [PrismaService],
})
export class AppModule {}
