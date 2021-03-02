import { Module } from "@nestjs/common";
import UploadController from "./upload.controller";
import UploadService from "./upload.service";

@Module({
  imports: [],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}