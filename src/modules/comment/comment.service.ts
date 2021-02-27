import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import HttpError from "exception/HttpError";
import User from "modules/user/user.entity";
import UserRepository from "modules/user/user.repository";
import Comment from "./comment.entity";
import CommentRepository from "./comment.repository";
import { CommentDto } from "./dto/comment.dto";
import PostService from "modules/post/post.service";
import PostEntity from "modules/post/post.entity";
import PostEntityRepository from "modules/post/post.repository";

@Injectable()
export default class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,

    private readonly postService: PostService,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(PostEntity)
    private readonly postRepository: PostEntityRepository,
  ) {}

  public async getComments(postIdx: number): Promise<Comment[]> {
    const comments: Comment[] = await this.commentRepository.getCommentsByPostIdx(postIdx)[0];
    return comments;
  }

  public async handleCreateComment(createCommentDto: CommentDto, user: User): Promise<void> {
    const { contents, postIdx } = createCommentDto;
    const existPost: PostEntity = await this.postService.getPostByIdx(postIdx);

    const comment = new Comment();
    comment.user = await this.userRepository.getUserByIdx(user.idx);
    comment.contents = contents;
    comment.post = existPost;
    comment.createdAt = new Date();
    comment.updatedAt = null;
    await this.commentRepository.save(comment);

    existPost.commentCount++;
    await this.postRepository.save(existPost);
  }

  public async handleModifyComment(commentIdx: number, modifyCommentDto: CommentDto, user: User): Promise<void> {
    const comment: Comment = await this.getExistComment(commentIdx);
    const { contents, postIdx } = modifyCommentDto;

    if (comment.fk_user_idx !== user.idx) {
      throw new HttpError(403, '댓글을 수정할 권한이 없습니다.');
    }

    comment.user = await this.userRepository.getUserByIdx(user.idx);
    comment.contents = contents;
    comment.post = await this.postService.getPostByIdx(postIdx);
    comment.updatedAt = new Date();

    await this.commentRepository.save(comment);
  }

  public async handleDeleteComment(postIdx: number, commentIdx: number, user: User): Promise<void> {
    const comment: Comment = await this.getExistComment(commentIdx);
    const existPost: PostEntity = await this.postService.getPostByIdx(postIdx);

    if (comment.fk_user_idx !== user.idx) {
      throw new HttpError(403, '댓글을 삭제할 권한이 없습니다.');
    }

    await this.commentRepository.remove(comment);

    existPost.commentCount--;
    await this.postRepository.save(existPost);
  }

  public async getExistComment(commentIdx: number): Promise<Comment> {
    const comment: Comment = await this.commentRepository.getCommentByIdx(commentIdx);

    if (comment === undefined) {
      throw new HttpError(404, '존재하지 않는 댓글입니다.');
    }

    return comment;
  }
}