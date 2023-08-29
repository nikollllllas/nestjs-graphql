import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(500)
  @MinLength(3)
  @Field()
  comment: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  @Field()
  idPost: string;
}
