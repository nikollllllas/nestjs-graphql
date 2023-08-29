import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { GetUser } from 'src/shared/decorators/gest-user.decorator';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateProfilePicture(
    @Args('urlProfilePicture') urlProfilePicture: string,
    @GetUser() user: User,
  ) {
    return this.userService.updateProfilePicture(user.id, urlProfilePicture);
  }
}
