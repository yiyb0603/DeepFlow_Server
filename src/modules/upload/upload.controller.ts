import { Controller, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Response } from 'express';
import { FilesInterceptor } from "@nestjs/platform-express";
import { Token } from "lib/decorator/user.decorator";
import { multerOptions } from "lib/multerOptions";
import User from "modules/user/user.entity";
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
    @Res() response: Response,
    @Token() user: User,
    @UploadedFiles() files: File[],
  ) {
    const uploadedFiles: string[] = this.uploadService.uploadFiles(files);

    return response.status(200).json({
      status: 200,
      message: '파일 업로드를 성공하였습니다.',
      data: {
        files: uploadedFiles,
      },
    });
  }
}