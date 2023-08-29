import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { v4 as uuid } from 'uuid';

import { CreatePostInput } from './input/create-post.input';
import { Post } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
    @InjectModel('Comment')
    private readonly commentModel: Model<Comment>,
  ) {}

  async createPost(createPostInput: CreatePostInput, user: User) {
    const { description, urlImage } = createPostInput;

    const post = new this.postModel({
      id: uuid(),
      description,
      urlImage,
      likes: 0,
      usuario: user,
    });

    return post.save();
  }

  async listPosts() {
    const posts = await this.postModel
      .find()
      .populate([
        {
          path: 'user',
          model: 'User',
        },
        {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User',
          },
        },
      ])
      .exec();

    if (!posts) throw new NotFoundException('Nenhum post encontrado');

    return posts;
  }

  async viewPost(id: string) {
    const post = await this.postModel
      .findOne({ id })
      .populate([
        {
          path: 'user',
          model: 'User',
        },
        {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User',
          },
        },
      ])
      .exec();

    if (!post) throw new NotFoundException('Post não encontrado');

    return post;
  }

  async editPost(
    id: string,
    createPostInput: CreatePostInput,
    idUser: string,
  ) {
    const post = await this.viewPost(id);

    if (idUser !== post.user.id)
      throw new BadRequestException('Você não pode excluir esse post');

    await this.postModel
      .findOneAndUpdate({ id }, { $set: createPostInput })
      .exec();

    return this.viewPost(id);
  }

  async excludePost(id: string, idUser: string) {
    const post = await this.viewPost(id);

    if (idUser !== post.user.id)
      throw new BadRequestException('Você não pode excluir esse post');

    if (post.comments.length > 0)
      for (const comment of post.comments) {
        await this.commentModel.deleteOne({
          id: comment.id,
        });
      }

    await this.postModel.deleteOne({
      id,
    });

    return 'Post excluído com sucesso';
  }

  async likePost(id: string) {
    const post = await this.viewPost(id);

    post.likes++;

    return post.save();
  }

  async dislikePost(id: string) {
    const post = await this.viewPost(id);

    post.likes--;

    return post.save();
  }
}
