import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagsRepository from 'tags/tags.repository';
import UserRepository from 'user/user.repository';
import PostController from './post.controller';
import PostRepository from './post.repository';
import PostService from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      TagsRepository,
      UserRepository,
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
})

export class PostModule {}