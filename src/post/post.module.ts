import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagsRepository from 'tags/tags.repository';
import UserRepository from 'user/user.repository';
import PostController from './post.controller';
import PostEntityRepository from './post.repository';
import PostService from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntityRepository,
      TagsRepository,
      UserRepository,
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
})

export class PostModule {}