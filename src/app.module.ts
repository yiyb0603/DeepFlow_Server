import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommentModule } from 'modules/comment/comment.module';
import CatchException from 'exception/CatchException';
import { PostModule } from 'modules/post/post.module';
import { TagModule } from 'modules/tag/tag.module';
import { UserModule } from 'modules/user/user.module';
import ormConfig from '../ormconfig';
import User from 'modules/user/user.entity';
import PostEntity from 'modules/post/post.entity';
import Comment from 'modules/comment/comment.entity';
import Reply from 'modules/reply/reply.entity';
import Tags from 'modules/tag/tag.entity';
import { ReplyModule } from 'modules/reply/reply.module';
import LikeEntity from 'modules/like/like.entity';
import { LikeModule } from 'modules/like/like.module';
import { ViewModule } from 'modules/view/view.module';
import View from 'modules/view/view.entity';
import Recommand from 'modules/recommand/recommand.entity';
import { RecommandModule } from 'modules/recommand/recommand.module';
import { UploadModule } from 'modules/upload/upload.module';
import Notice from 'modules/notice/notice.entity';
import { NoticeModule } from 'modules/notice/notice.module';
import { TokenModule } from 'modules/token/token.module';
import CommentEmoji from 'modules/commentEmoji/commentEmoji.entity';
import { CommentEmojiModule } from 'modules/commentEmoji/commentEmoji.module';
import NoticeView from 'modules/noticeView/noticeView.entity';
import { NoticeViewModule } from 'modules/noticeView/noticeView.module';

const loadEntities: TypeOrmModuleOptions = {
  ...ormConfig,
  entities: [
    User,
    PostEntity,
    Comment,
    CommentEmoji,
    Reply,
    Tags,
    LikeEntity,
    View,
    Recommand,
    Notice,
    NoticeView,
  ],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(loadEntities),
    UserModule,
    PostModule,
    TagModule,
    CommentModule,
    CommentEmojiModule,
    ReplyModule,
    LikeModule,
    ViewModule,
    RecommandModule,
    NoticeModule,
    NoticeViewModule,
    TagModule,
    UploadModule,
    TokenModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CatchException,
  }],
})
export class AppModule {}
