import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
