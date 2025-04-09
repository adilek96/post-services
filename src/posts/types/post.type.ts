import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MediaType {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;

  @Field()
  type: string;
}

@ObjectType()
export class CategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class SubcategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class PostType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [CategoryType])
  categories: CategoryType[];

  @Field(() => [SubcategoryType])
  subcategories: SubcategoryType[];

  @Field(() => [MediaType])
  media: MediaType[];
}
