import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagsRepository from 'modules/tags/tags.repository';
import UserRepository from 'modules/user/user.repository';
import ViewRepository from 'modules/view/view.repository';
import PostController from './post.controller';
import PostEntityRepository from './post.repository';
import PostService from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntityRepository,
      TagsRepository,
      UserRepository,
      ViewRepository,
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
})

export class PostModule {}