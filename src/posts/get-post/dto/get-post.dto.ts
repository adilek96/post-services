import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class GetPostInput {
  @Field()
  id: number;

}