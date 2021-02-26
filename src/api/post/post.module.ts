import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LikeEntityRepository from 'api/like/like.repository';
import TagsRepository from 'api/tags/tags.repository';
import UserRepository from 'api/user/user.repository';
import PostController from './post.controller';
import PostEntityRepository from './post.repository';
import PostService from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntityRepository,
      TagsRepository,
      UserRepository,
      LikeEntityRepository,
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
})

export class PostModule {}