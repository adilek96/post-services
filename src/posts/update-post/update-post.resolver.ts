import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdatePostService } from './update-post.service';
import { PostType } from '../types/post.type';
import { UpdatePostInput } from './dto/update-post.dto';

@Resolver(() => PostType)
export class UpdatePostResolver {
  constructor(private readonly updatePostService: UpdatePostService) {}

  @Mutation(() => PostType)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdatePostInput,
  ): Promise<PostType> {
    return this.updatePostService.updatePost(id, data);
  }
}
