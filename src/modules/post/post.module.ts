import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagRepository from 'modules/tag/tag.repository';
import TagService from 'modules/tag/tag.service';
import UserRepository from 'modules/user/user.repository';
import ViewRepository from 'modules/view/view.repository';
import PostController from './post.controller';
import PostEntityRepository from './post.repository';
import PostService from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntityRepository,
      TagRepository,
      UserRepository,
      ViewRepository,
    ]),
  ],
  providers: [PostService, TagService],
  controllers: [PostController],
})

export class PostModule {}