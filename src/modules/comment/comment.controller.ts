import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import User from 'modules/user/user.entity';
import { Token } from 'lib/decorator/user.decorator';
import AuthGuard from 'middleware/auth';
import Comment from './comment.entity';
import CommentService from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export default class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}
  
  @Get('/')
  public async getComments(@Query('postIdx') postIdx: number) {
    const comments: Comment[] = await this.commentService.getComments(postIdx);

    return {
      status: 200,
      message: '댓글 목록을 조회하였습니다.',
      data: {
        comments,
      },
    };
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleCreateComment(
    @Token() user: User,
    @Body() createCommentDto: CommentDto
  ) {
    await this.commentService.handleCreateComment(createCommentDto, user);
    return {
      status: 200,
      message: '댓글을 작성하였습니다.',
    };
  }

  @Put('/:idx')
  @UseGuards(new AuthGuard())
  public async handleModifyComment(
    @Token() user: User,
    @Param('idx') commentIdx: number,
    @Body() modifyCommentDto: CommentDto,
  ) {
    await this.commentService.handleModifyComment(commentIdx, modifyCommentDto, user);
    return {
      status: 200,
      message: '댓글을 수정하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeleteComment(
    @Token() user: User,
    @Query('postIdx') postIdx: number,
    @Param('idx') commentIdx: number,
  ) {
    await this.commentService.handleDeleteComment(postIdx, commentIdx, user);
    return {
      status: 200,
      message: '댓글을 삭제하였습니다.',
    };
  }
}