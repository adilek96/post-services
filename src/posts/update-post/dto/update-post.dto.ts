import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  subcategories?: string[];

  @Field(() => [MediaInput], { nullable: true })
  media?: MediaInput[];
}

@InputType()
export class MediaInput {
  @Field()
  url: string;

  @Field()
  type: string;
}
