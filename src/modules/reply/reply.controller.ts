import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import User from 'modules/user/user.entity';
import { Token } from 'lib/decorator/user.decorator';
import AuthGuard from 'middleware/auth';
import { ReplyDto } from './dto/reply.dto';
import ReplyService from './reply.service';

@Controller('reply')
export default class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
  ) {}

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleCreateReply(
    @Token() user: User,
    @Body() createReplyDto: ReplyDto,
  ) {
    await this.replyService.handleCreateReply(createReplyDto, user);
    
    return {
      status: 200,
      message: '답글을 작성하였습니다.',
    };
  }

  @Put('/:idx')
  @UseGuards(new AuthGuard())
  public async handleModifyReply(
    @Token() user: User,
    @Param('idx') replyIdx: number,
    @Body() modifyReplyDto: ReplyDto,
  ) {
    await this.replyService.handleModifyReply(replyIdx, modifyReplyDto, user);

    return {
      status: 200,
      message: '답글을 수정하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeleteReply(
    @Token() user: User,
    @Param('idx') replyIdx: number,
  ) {
    await this.replyService.handleDeleteReply(replyIdx, user);

    return {
      status: 200,
      message: '답글을 삭제하였습니다.',
    };
  }
}