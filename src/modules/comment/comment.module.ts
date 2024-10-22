import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEmojiRepository from 'modules/commentEmoji/commentEmoji.repository';
import LikeEntityRepository from 'modules/like/like.repository';
import PostEntityRepository from 'modules/post/post.repository';
import PostService from 'modules/post/post.service';
import ReplyRepository from 'modules/reply/reply.repository';
import TagRepository from 'modules/tag/tag.repository';
import TagService from 'modules/tag/tag.service';
import UserRepository from 'modules/user/user.repository';
import ViewRepository from 'modules/view/view.repository';
import CommentController from './comment.controller';
import CommentRepository from './comment.repository';
import CommentService from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntityRepository,
      TagRepository,
      CommentRepository,
      UserRepository,
      LikeEntityRepository,
      ViewRepository,
      ReplyRepository,
      CommentEmojiRepository,
    ]),
  ],
  providers: [CommentService, PostService, TagService],
  controllers: [CommentController],
})

export class CommentModule {}