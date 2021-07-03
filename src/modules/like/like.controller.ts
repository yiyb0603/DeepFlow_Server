import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import User from 'modules/user/user.entity';
import { Token } from 'lib/decorator/user.decorator';
import AuthGuard from 'middleware/auth';
import { LikeDto } from './dto/like.dto';
import LikeEntity from './like.entity';
import LikeService from './like.service';

@Controller('like')
export default class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) {}
  
  @Get('/')
  public async getLikeList(
    @Query('postIdx') postIdx: number,
  ) {
    const likes: LikeEntity[] = await this.likeService.getLikeList(postIdx);

    return {
      status: 200,
      message: '좋아요 목록을 조회하였습니다.',
      data: {
        likes,
      },
    };
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleAddLike(
    @Token() user: User,
    @Body() addLikeDto: LikeDto,
  ) {
    await this.likeService.handleAddLike(addLikeDto, user);

    return {
      status: 200,
      message: '좋아요를 추가하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeleteLike(
    @Token() user: User,
    @Query('postIdx') postIdx: number,
    @Param('idx') likeIdx: number,
  ) {
    await this.likeService.handleDeleteLike(postIdx, likeIdx, user);

    return {
      status: 200,
      message: '좋아요를 삭제하였습니다.',
    };
  }
}