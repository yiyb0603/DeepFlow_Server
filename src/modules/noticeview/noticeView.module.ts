import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NoticeView from './noticeView.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NoticeView,
    ])
  ],
  controllers: [],
  providers: [],
})
export class NoticeViewModule {}