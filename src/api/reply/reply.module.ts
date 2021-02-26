import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentRepository from 'api/comment/comment.repository';
import CommentService from 'api/comment/comment.service';
import LikeEntityRepository from 'api/like/like.repository';
import PostEntityRepository from 'api/post/post.repository';
import PostService from 'api/post/post.service';
import TagsRepository from 'api/tags/tags.repository';
import UserRepository from 'api/user/user.repository';
import UserService from 'api/user/user.service';
import ReplyController from './reply.controller';
import ReplyRepository from './reply.repository';
import ReplyService from './reply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReplyRepository,
      PostEntityRepository,
      TagsRepository,
      LikeEntityRepository,
      UserRepository,
      CommentRepository,
    ]),
  ],
  providers: [ReplyService, PostService, CommentService, UserService],
  controllers: [ReplyController],
})

export class ReplyModule {}