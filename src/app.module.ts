import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import CatchException from 'exception/CatchException';
import { PostModule } from 'post/post.module';
import { TagsModule } from 'tags/tags.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), UserModule, PostModule, TagsModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CatchException,
  }],
})
export class AppModule {}
