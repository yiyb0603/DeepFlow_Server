import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import User from "api/user/user.entity";
import { Response } from 'express';
import { Token } from "lib/decorator/user.decorator";
import AuthGuard from "middleware/auth";
import { LikeDto } from "./dto/like.dto";
import LikeEntity from "./like.entity";
import LikeService from "./like.service";

@Controller('like')
export default class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) {}
  
  @Get('/')
  public async getLikeList(
    @Res() response: Response,
    @Query('postIdx') postIdx: number,
  ) {
    const likes: LikeEntity[] = await this.likeService.getLikeList(postIdx);

    return response.status(200).json({
      status: 200,
      message: '좋아요 목록을 조회하였습니다.',
      data: {
        likes,
      },
    });
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleAddLike(
    @Res() response: Response,
    @Token() user: User,
    @Body() addLikeDto: LikeDto,
  ) {
    await this.likeService.handleAddLike(addLikeDto, user);

    return response.status(200).json({
      status: 200,
      message: '좋아요를 추가하였습니다.',
    });
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeleteLike(
    @Res() response: Response,
    @Token() user: User,
    @Param('idx') likeIdx: number,
  ) {
    await this.likeService.handleDeleteLike(likeIdx, user);

    return response.status(200).json({
      status: 200,
      message: '좋아요를 삭제하였습니다.',
    });
  }
}