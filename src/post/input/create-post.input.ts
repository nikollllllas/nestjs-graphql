import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @MinLength(3)
  @MaxLength(500)
  @IsString()
  description: string;

  @Field()
  @IsUrl()
  urlImage: string;
}
