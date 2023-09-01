import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Comment } from 'src/comment/schema/comment.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
@ObjectType()
export class Post {
  @Prop()
  @Field()
  id: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  urlImage: string;

  @Prop()
  @Field()
  likes: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
