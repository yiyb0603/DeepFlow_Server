import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntityRepository from 'post/post.repository';
import UserRepository from 'user/user.repository';
import CommentController from './comment.controller';
import CommentRepository from './comment.repository';
import CommentService from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      PostEntityRepository,
      UserRepository,
    ]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})

export class CommentModule {}