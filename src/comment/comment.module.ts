import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/post/post.module';

import { CommentSchema } from './schema/comment.schema';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
    ]),
    forwardRef(() => PostModule),
  ],
  providers: [CommentService, CommentResolver],
  exports: [MongooseModule],
})
export class CommentModule {}
