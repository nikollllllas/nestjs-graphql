import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { AuthInput } from './auth.input';

@InputType()
export class SignUpInput extends PickType(AuthInput, [
  'email',
  'password',
] as const) {
  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
