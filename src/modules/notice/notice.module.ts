import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserRepository from "modules/user/user.repository";
import NoticeController from "./notice.controller";
import NoticeRepository from "./notice.repository";
import NoticeService from "./notice.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NoticeRepository,
      UserRepository,
    ])
  ],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}