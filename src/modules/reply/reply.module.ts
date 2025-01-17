import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentRepository from 'modules/comment/comment.repository';
import CommentService from 'modules/comment/comment.service';
import CommentEmojiRepository from 'modules/commentEmoji/commentEmoji.repository';
import LikeEntityRepository from 'modules/like/like.repository';
import PostEntityRepository from 'modules/post/post.repository';
import PostService from 'modules/post/post.service';
import RecommandRepository from 'modules/recommand/recommand.repository';
import TagRepository from 'modules/tag/tag.repository';
import TagService from 'modules/tag/tag.service';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';
import ViewRepository from 'modules/view/view.repository';
import ReplyController from './reply.controller';
import ReplyRepository from './reply.repository';
import ReplyService from './reply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReplyRepository,
      PostEntityRepository,
      TagRepository,
      LikeEntityRepository,
      UserRepository,
      CommentRepository,
      ViewRepository,
      RecommandRepository,
      CommentEmojiRepository,
    ]),
  ],
  providers: [
    ReplyService,
    PostService,
    CommentService,
    UserService,
    TagService
  ],
  controllers: [ReplyController],
})

export class ReplyModule {}