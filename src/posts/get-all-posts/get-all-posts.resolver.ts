// src/posts/get-all-posts/get-all-posts.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetAllPostsService } from './get-all-posts.service';
import { PostType } from '../types/post.type';
import { GetAllPostsInput } from './dto/get-all-posts.input';

@Resolver(() => PostType)
export class GetAllPostsResolver {
  constructor(private readonly getAllPostsService: GetAllPostsService) {}

  @Query(() => [PostType])
  async getAllPosts(
    @Args('filter', { nullable: true }) filter: GetAllPostsInput,
  ): Promise<PostType[]> {
    return this.getAllPostsService.getAllPosts(filter);
  }
}
