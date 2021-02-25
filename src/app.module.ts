import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommentModule } from 'api/comment/comment.module';
import CatchException from 'exception/CatchException';
import { PostModule } from 'api/post/post.module';
import { TagsModule } from 'api/tags/tags.module';
import { UserModule } from 'api/user/user.module';
import ormConfig from '../ormconfig';
import User from 'api/user/user.entity';
import PostEntity from 'api/post/post.entity';
import Comment from 'api/comment/comment.entity';
import Reply from 'api/reply/reply.entity';
import Tags from 'api/tags/tags.entity';

const loadEntities: TypeOrmModuleOptions = {
  ...ormConfig,
  entities: [
    User,
    PostEntity,
    Comment,
    Reply,
    Tags,
  ],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(loadEntities),
    UserModule,
    PostModule,
    TagsModule,
    CommentModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CatchException,
  }],
})
export class AppModule {}
