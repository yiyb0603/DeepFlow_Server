import { Body, Controller, Delete, Get, Param, Post, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import Comment from "./comment.entity";
import CommentService from "./comment.service";
import { CreateCommentDto } from "./dto/comment.dto";

@Controller('comment')
export default class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}
  
  @Get('/')
  public async getComments(@Res() response: Response, @Query('postIdx') postIdx: number) {
    const comments: Comment[] = await this.commentService.getComments(postIdx);

    return response.status(200).json({
      status: 200,
      message: '댓글 목록을 조회하였습니다.',
      data: {
        comments,
      },
    });
  }

  @Post('/')
  public async createComment(@Res() response: Response, @Body() createCommentDto: CreateCommentDto) {
    await this.commentService.createComment(createCommentDto);
    return response.status(200).json({
      status: 200,
      message: '댓글을 작성하였습니다.',
    });
  }

  @Delete('/:idx')
  public async deleteComment(@Res() response: Response, @Param('idx') commentIdx: number) {
    await this.commentService.deleteComment(commentIdx);
    return response.status(200).json({
      status: 200,
      message: '댓글을 삭제하였습니다.',
    });
  }
}