import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntityRepository from 'api/post/post.repository';
import PostService from 'api/post/post.service';
import TagsRepository from 'api/tags/tags.repository';
import UserRepository from 'api/user/user.repository';
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
    ]),
  ],
  providers: [LikeService, PostService],
  controllers: [LikeController],
})

export class LikeModule {}