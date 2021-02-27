import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentRepository from 'modules/comment/comment.repository';
import PostEntityRepository from 'modules/post/post.repository';
import PostService from 'modules/post/post.service';
import TagsRepository from 'modules/tags/tags.repository';
import UserRepository from 'modules/user/user.repository';
import ViewRepository from 'modules/view/view.repository';
import LikeController from './like.controller';
import LikeEntityRepository from './like.repository';
import LikeService from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikeEntityRepository,
      PostEntityRepository,
      TagsRepository,
      UserRepository,
      ViewRepository,
      CommentRepository,
    ]),
  ],
  providers: [LikeService, PostService],
  controllers: [LikeController],
})

export class LikeModule {}