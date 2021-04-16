import { Injectable } from '@nestjs/common';
import CommentService from 'modules/comment/comment.service';
import PostService from 'modules/post/post.service';
import User from 'modules/user/user.entity';
import UserService from 'modules/user/user.service';
import HttpError from 'exception/HttpError';
import { ReplyDto } from './dto/reply.dto';
import Reply from './reply.entity';
import ReplyRepository from './reply.repository';
import Comment from 'modules/comment/comment.entity';
import { sendFCM } from 'lib/sendFCM';
import getProcessEnv from 'lib/getProcessEnv';
import PostEntity from 'modules/post/post.entity';

@Injectable()
export default class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,

    private readonly postService: PostService,

    private readonly commentService: CommentService,

    private readonly userService: UserService,
  ) {}

  public async handleCreateReply(createReplyDto: ReplyDto, user: User): Promise<void> {
    const { contents, commentIdx, postIdx } = createReplyDto;
    const existPost: PostEntity = await this.postService.getPostByIdx(postIdx);
    const existComment: Comment = await this.commentService.getExistComment(commentIdx);
    
    const reply: Reply = new Reply();
    reply.contents = contents;
    reply.comment = await this.commentService.getExistComment(commentIdx);
    reply.post = await this.postService.getPostByIdx(postIdx);
    reply.user = await this.userService.getUserInfoByIdx(user.idx);
    reply.createdAt = new Date();
    reply.updatedAt = null;

    await this.replyRepository.save(reply);
    
    const { fcmAllow, fcmToken, name } = existComment.user;
    if (fcmAllow && fcmToken) {
      sendFCM({
        token: fcmToken,
        title: `${name} 님이 답글을 작성하였습니다`,
        body: contents,
        link: `${getProcessEnv('WEB_ADDRESS')}/post/${existPost.idx}`,
      });
    }
  }

  public async handleModifyReply(replyIdx: number, modifyReplyDto: ReplyDto, user: User): Promise<void> {
    const { contents } = modifyReplyDto;
    const reply: Reply = await this.getExistReply(replyIdx);

    if (reply.fk_user_idx !== user.idx) {
      throw new HttpError(403, '답글을 수정할 권한이 없습니다.');
    }

    reply.contents = contents;
    reply.updatedAt = new Date();

    await this.replyRepository.save(reply);
  }

  public async handleDeleteReply(replyIdx: number, user: User): Promise<void> {
    const reply: Reply = await this.getExistReply(replyIdx);

    if (reply.fk_user_idx !== user.idx) {
      throw new HttpError(403, '답글을 삭제할 권한이 없습니다.');
    }
    
    await this.replyRepository.remove(reply);
  }

  public async getExistReply(replyIdx: number): Promise<Reply> {
    const reply: Reply = await this.replyRepository.getReplyByIdx(replyIdx);

    if (reply === undefined) {
      throw new HttpError(404, '존재하지 않는 답글입니다.');
    }

    return reply;
  }
}