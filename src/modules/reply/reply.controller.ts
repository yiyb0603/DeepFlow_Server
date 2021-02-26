import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import User from "modules/user/user.entity";
import { Response } from 'express';
import { Token } from "lib/decorator/user.decorator";
import AuthGuard from "middleware/auth";
import { CreateReplyDto, ModifyReplyDto } from "./dto/reply.dto";
import Reply from "./reply.entity";
import ReplyService from "./reply.service";

@Controller('reply')
export default class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
  ) {}

  @Get('/')
  public async getReplies(
    @Res() response: Response,
    @Query('postIdx') postIdx: number
  ) {
    const replies: Reply[] = await this.replyService.getReplies(postIdx);

    return response.status(200).json({
      status: 200,
      message: '답글 목록을 조회하였습니다.',
      data: {
        replies,
      },
    });
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleCreateReply(
    @Res() response: Response,
    @Token() user: User,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    await this.replyService.handleCreateReply(createReplyDto, user);
    
    return response.status(200).json({
      status: 200,
      message: '답글을 작성하였습니다.',
    });
  }

  @Put('/:idx')
  @UseGuards(new AuthGuard())
  public async handleModifyReply(
    @Res() response: Response,
    @Token() user: User,
    @Param('idx') replyIdx: number,
    @Body() modifyReplyDto: ModifyReplyDto,
  ) {
    await this.replyService.handleModifyReply(replyIdx, modifyReplyDto, user);

    return response.status(200).json({
      status: 200,
      message: '답글을 수정하였습니다.',
    });
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeleteReply(
    @Res() response: Response,
    @Token() user: User,
    @Param('idx') replyIdx: number,
  ) {
    await this.replyService.handleDeleteReply(replyIdx, user);

    return response.status(200).json({
      status: 200,
      message: '답글을 삭제하였습니다.',
    });
  }
}