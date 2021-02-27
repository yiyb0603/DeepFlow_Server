import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommentModule } from 'modules/comment/comment.module';
import CatchException from 'exception/CatchException';
import { PostModule } from 'modules/post/post.module';
import { TagsModule } from 'modules/tags/tags.module';
import { UserModule } from 'modules/user/user.module';
import ormConfig from '../ormconfig';
import User from 'modules/user/user.entity';
import PostEntity from 'modules/post/post.entity';
import Comment from 'modules/comment/comment.entity';
import Reply from 'modules/reply/reply.entity';
import Tags from 'modules/tags/tags.entity';
import { ReplyModule } from 'modules/reply/reply.module';
import LikeEntity from 'modules/like/like.entity';
import { LikeModule } from 'modules/like/like.module';
import { ViewModule } from 'modules/view/view.module';
import View from 'modules/view/view.entity';

const loadEntities: TypeOrmModuleOptions = {
  ...ormConfig,
  entities: [
    User,
    PostEntity,
    Comment,
    Reply,
    Tags,
    LikeEntity,
    View,
  ],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(loadEntities),
    UserModule,
    PostModule,
    TagsModule,
    CommentModule,
    ReplyModule,
    LikeModule,
    ViewModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CatchException,
  }],
})
export class AppModule {}
