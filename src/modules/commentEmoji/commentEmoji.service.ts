import { Injectable } from '@nestjs/common';
import HttpError from 'exception/HttpError';
import Comment from 'modules/comment/comment.entity';
import CommentService from 'modules/comment/comment.service';
import User from 'modules/user/user.entity';
import CommentEmoji from './commentEmoji.entity';
import CommentEmojiRepository from './commentEmoji.repository';
import { CommentEmojiDto } from './dto/commentEmoji.dto';

@Injectable()
export default class CommentEmojiService {
  constructor(
    private readonly commentEmojiRepository: CommentEmojiRepository,

    private readonly commentService: CommentService,
  ) {}
  
  public async createCommentEmoji(commentEmojiDto: CommentEmojiDto, user: User): Promise<void> {
    const { emoji, commentIdx } = commentEmojiDto;

    const existComment: Comment = await this.commentService.getExistComment(commentIdx);
    const existEmoji: CommentEmoji = await this.commentEmojiRepository.getIsPressedEmoji(emoji, commentIdx, user.idx);

    if (existEmoji !== undefined) {
      throw new HttpError(409, '이미 공감하였습니다.');
    }

    if (existComment !== undefined) {
      const commentEmoji: CommentEmoji = new CommentEmoji();
      
      commentEmoji.emoji = emoji;
      commentEmoji.comment = existComment;
      commentEmoji.user = user;

      await this.commentEmojiRepository.save(commentEmoji);
    }
  }

  public async deleteCommentEmoji(emojiIdx: number, user: User): Promise<void> {
    const existEmoji = await this.commentEmojiRepository.getEmojiByIdx(emojiIdx);

    if (existEmoji === undefined) {
      throw new HttpError(404, '존재하지 않는 댓글 공감입니다.');
    }

    if (existEmoji.fk_user_idx !== user.idx) {
      throw new HttpError(409, '해당 댓글공감을 삭제할 수 없습니다.');
    }
    
    await this.commentEmojiRepository.remove(existEmoji);
  }
}