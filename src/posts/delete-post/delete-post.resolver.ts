import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { DeletePostService } from './delete-post.service';
import { PostType } from '../types/post.type'; // Твой DTO

@Resolver(() => PostType)
export class DeletePostResolver {
  constructor(private readonly postsService: DeletePostService) {}

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.postsService.deletePost(id);
  }
}
