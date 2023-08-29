import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/shared/decorators/gest-user.decorator';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { User } from 'src/user/schemas/user.schema';

import { CommentService } from './comment.service';
import { CreateCommentInput } from './input/create-comment-input';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async addComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @GetUser() user: User,
  ) {
    return this.commentService.addComment(
      createCommentInput,
      user,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async excludeComment(@Args('id') id: string) {
    return this.commentService.excludeComment(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async searchComment(@Args('id') id: string) {
    return this.commentService.searchComment(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async likeComment(@Args('id') id: string) {
    return this.commentService.likeComment(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async dislikeComment(@Args('id') id: string) {
    return this.commentService.dislikeComment(id);
  }
}
