import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntityRepository from 'api/post/post.repository';
import PostService from 'api/post/post.service';
import TagsRepository from 'api/tags/tags.repository';
import UserRepository from 'api/user/user.repository';
import CommentController from './comment.controller';
import CommentRepository from './comment.repository';
import CommentService from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntityRepository,
      TagsRepository,
      CommentRepository,
      UserRepository,
    ]),
  ],
  providers: [CommentService, PostService],
  controllers: [CommentController],
})

export class CommentModule {}