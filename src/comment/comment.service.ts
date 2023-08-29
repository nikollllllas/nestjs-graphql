import { 
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/post/schema/post.schema";
import { User } from "src/user/schemas/user.schema";
import { v4 as uuid } from 'uuid';

import { CreateCommentInput } from "./input/create-comment-input";
import { Comment } from "./schema/comment.schema";

  @Injectable()
  export class CommentService {
    constructor(
      @InjectModel('Comment')
      private readonly commentModel: Model<Comment>,
      @InjectModel('Post')
      private readonly postModel: Model<Post>,
    ) {}
  
    async searchComment(id: string) {
      const comment = await this.commentModel
        .findOne({
          id,
        })
        .populate(['user', 'post'])
        .exec();
  
      if (!comment) throw new NotFoundException('Comentário não encontrado');
  
      return comment;
    }
  
    async addComment(
      createCommentInput: CreateCommentInput,
      user: User,
    ) {
      const post = await this.postModel
        .findOne({
          id: createCommentInput.idPost,
        })
        .populate('comments')
        .exec();
  
      if (!post) throw new NotFoundException('Post não encontrado');
  
      if (!post.comments) post.comments = [];
  
      const newComment = new this.commentModel({
        id: uuid(),
        text: createCommentInput.comment,
        likes: 0,
        post,
        user,
      });
  
      post.comments.push(newComment);
      post.save();
  
      return newComment.save();
    }
  
    async excludeComment(id: string) {
      const comment = await this.searchComment(id);
  
      const post = await this.postModel
        .findOne({
          id: comment.post.id,
        })
        .populate('user')
        .exec();
  
      if (!post) throw new NotFoundException('Post não encontrado');
  
      if (post.user.id !== comment.user.id)
        throw new BadRequestException('Você não pode excluir esse comentário');
  
      post.comments = post.comments.filter(
        (comment) => comment.id !== id,
      );
  
      post.save();
  
      await comment.deleteOne();
  
      return 'Comentário excluído com sucesso';
    }
  
    async likeComment(id: string) {
      const comment = await this.searchComment(id);
  
      comment.likes++;
  
      return comment.save();
    }
  
    async dislikeComment(id: string) {
      const comment = await this.searchComment(id);
  
      comment.likes--;
  
      return comment.save();
    }
  }