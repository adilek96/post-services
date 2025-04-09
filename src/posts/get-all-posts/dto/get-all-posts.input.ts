import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GetAllPostsInput {
  @Field({ nullable: true })
  sort?: 'asc' | 'desc';

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  subcategory?: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;
}
