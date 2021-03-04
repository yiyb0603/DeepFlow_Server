import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "lib/multerOptions";
import UploadService from "./upload.service";
import AuthGuard from "middleware/auth";

@Controller('uploads')
export default class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @UseInterceptors(FilesInterceptor('images', null, multerOptions))
  @Post('/')
  @UseGuards(new AuthGuard())
  public uploadFiles(
    @UploadedFiles() files: File[],
  ) {
    const uploadedFiles: string[] = this.uploadService.uploadFiles(files);

    return {
      status: 200,
      message: '파일 업로드를 성공하였습니다.',
      data: {
        files: uploadedFiles,
      },
    };
  }
}