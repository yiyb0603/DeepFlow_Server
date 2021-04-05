import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentRepository from 'modules/comment/comment.repository';
import CommentService from 'modules/comment/comment.service';
import LikeEntityRepository from 'modules/like/like.repository';
import PostEntityRepository from 'modules/post/post.repository';
import PostService from 'modules/post/post.service';
import ReplyRepository from 'modules/reply/reply.repository';
import TagRepository from 'modules/tag/tag.repository';
import TagService from 'modules/tag/tag.service';
import UserRepository from 'modules/user/user.repository';
import ViewRepository from 'modules/view/view.repository';
import CommentEmojiController from './commentEmoji.controller';
import CommentEmojiRepository from './commentEmoji.repository';
import CommentEmojiService from './commentEmoji.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEmojiRepository,
      CommentRepository,
      ReplyRepository,
      UserRepository,
      PostEntityRepository,
      TagRepository,
      LikeEntityRepository,
      ViewRepository,
    ]),
  ],
  providers: [
    CommentEmojiService,
    CommentService,
    PostService,
    TagService,
  ],
  controllers: [CommentEmojiController],
})
export class CommentEmojiModule {
  
}