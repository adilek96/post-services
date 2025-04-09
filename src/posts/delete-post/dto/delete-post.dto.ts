import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class DeletePostInput {
  @Field()
  id: number;

}