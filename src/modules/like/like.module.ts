import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntityRepository from 'modules/post/post.repository';
import PostService from 'modules/post/post.service';
import TagsRepository from 'modules/tags/tags.repository';
import UserRepository from 'modules/user/user.repository';
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