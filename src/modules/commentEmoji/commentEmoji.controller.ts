import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { Token } from 'lib/decorator/user.decorator';
import AuthGuard from 'middleware/auth';
import User from 'modules/user/user.entity';
import CommentEmojiService from './commentEmoji.service';
import { CommentEmojiDto } from './dto/commentEmoji.dto';

@Controller('/comment-emoji')
export default class CommentEmojiController {
  constructor(
    private readonly commentEmojiService: CommentEmojiService,
  ) {}
  
  @Post('/')
  @UseGuards(new AuthGuard())
  public async createCommentEmoji(
    @Token() user: User,
    @Body() commentEmojiDto: CommentEmojiDto,
  ) {
    await this.commentEmojiService.createCommentEmoji(commentEmojiDto, user);

    return {
      status: 200,
      message: '댓글 공감을 추가하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async deleteCommentEmoji(
    @Token() user: User,
    @Param('idx') emojiIdx: number,
  ) {
    await this.commentEmojiService.deleteCommentEmoji(emojiIdx, user);

    return {
      status: 200,
      message: '댓글 공감을 삭제하였습니다.',
    };
  }
}