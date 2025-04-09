import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GetPostService } from './get-post.service';
import { PostType } from '../types/post.type';

@Resolver(() => PostType)
export class GetPostResolver {
  constructor(private readonly getPostService: GetPostService) {}

  @Query(() => PostType, { nullable: true })
  async getPostById(@Args('id', { type: () => Int }) id: number): Promise<PostType | null> {
    return this.getPostService.getPostById(id);
  }
}
