import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [String])
  categories: string[];

  @Field(() => [String])
  subcategories: string[];

  @Field(() => [CreateMediaInput], { nullable: true })
  media?: CreateMediaInput[];  
}

@InputType()
export class CreateMediaInput {
  @Field()
  url: string;

  @Field()
  type: string;
}