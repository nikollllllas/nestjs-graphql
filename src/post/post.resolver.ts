import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { User } from 'src/user/schemas/user.schema';
import { GetUser } from 'src/shared/decorators/gest-user.decorator';

import { CreatePostInput } from './input/create-post.input';
import { PostService } from './post.service';
import { Post } from './schema/post.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  @UseGuards(GqlAuthGuard)
  async listPosts(): Promise<Post[]> {
    return this.postService.listPosts();
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @GetUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postService.createPost(createPostInput, user);
  }

  @Query(() => Post)
  @UseGuards(GqlAuthGuard)
  async viewPost(@Args('id') id: string): Promise<Post> {
    return this.postService.viewPost(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async editPost(
    @Args('id') id: string,
    @Args('createPostInput') createPostInput: CreatePostInput,
    @GetUser() user: User,
  ): Promise<Post> {
    return this.postService.editPost(id, createPostInput, user.id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async excludePost(
    @Args('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.postService.excludePost(id, user.id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async likePost(@Args('id') id: string): Promise<Post> {
    return this.postService.likePost(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async dislikePost(@Args('id') id: string): Promise<Post> {
    return this.postService.dislikePost(id);
  }
}
