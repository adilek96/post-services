import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { Post as PostType } from '@prisma/client'; // Импортируйте тип из Prisma
import { PostsService } from './create-post.service';
import { CreatePostInput } from './dto/create-post.dto';

@ObjectType() // Определяем класс как объект GraphQL
export class Post implements PostType { // Наследуем от PostType
  @Field() // Определяем поле
  id: number;

  @Field() // Определяем поле
  title: string;

  @Field() // Определяем поле
  content: string;

  @Field() // Добавляем поле createdAt
  createdAt: Date;

  @Field() // Добавляем поле updatedAt
  updatedAt: Date;

  // Добавьте другие поля по мере необходимости
}

@Resolver(() => Post) // Используйте новый класс здесь
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post) // Используйте новый класс здесь
  async createPost(
    @Args('data') data: CreatePostInput,
  ): Promise<Post> { // Используйте новый класс здесь
    return this.postsService.createPost(
      data.title,
      data.content,
      data.categories,
      data.subcategories,
      data.media,
    );
  }
}