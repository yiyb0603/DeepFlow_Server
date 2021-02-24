import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'api/comment/comment.module';
import CatchException from 'exception/CatchException';
import { PostModule } from 'api/post/post.module';
import { TagsModule } from 'api/tags/tags.module';
import { UserModule } from 'api/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), UserModule, PostModule, TagsModule, CommentModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CatchException,
  }],
})
export class AppModule {}
