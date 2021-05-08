import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import NoticeViewRepository from 'modules/noticeView/noticeView.repository';
import UserRepository from "modules/user/user.repository";
import NoticeController from "./notice.controller";
import NoticeRepository from "./notice.repository";
import NoticeService from "./notice.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NoticeRepository,
      UserRepository,
      NoticeViewRepository,
    ])
  ],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}