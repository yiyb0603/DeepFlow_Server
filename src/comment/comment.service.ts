import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import HttpError from "exception/HttpError";
import PostEntity from "post/post.entity";
import PostEntityRepository from "post/post.repository";
import User from "user/user.entity";
import UserRepository from "user/user.repository";
import Comment from "./comment.entity";
import CommentRepository from "./comment.repository";
import { CreateCommentDto } from "./dto/comment.dto";

@Injectable()
export default class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,

    @InjectRepository(PostEntity)
    private readonly postRepository: PostEntityRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async getComments(postIdx: number): Promise<Comment[]> {
    await this.getExistPost(postIdx);

    const comments: Comment[] = await this.commentRepository.getCommentsByPostIdx(postIdx);
    return comments;
  }

  public async createComment(createCommentDto: CreateCommentDto): Promise<void> {
    const { userIdx, contents, postIdx } = createCommentDto;

    const comment = new Comment();
    comment.user = await this.getExistUser(userIdx);
    comment.contents = contents;
    comment.post = await this.getExistPost(postIdx);
    comment.createdAt = new Date();
    comment.updatedAt = null;
  }

  public async deleteComment(commentIdx: number): Promise<void> {
    const comment = await this.commentRepository.getCommentByIdx(commentIdx);

    if (!comment) {
      throw new HttpError(404, '존재하지 않는 댓글입니다.');
    }

    await this.commentRepository.remove(comment);
  }

  public async getExistUser(userIdx: number): Promise<User> {
    const user: User = await this.userRepository.getUserByIdx(userIdx);

    if (!user) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    return user;
  }

  public async getExistPost(postIdx: number): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.getPostByIdx(postIdx);
    if (!post) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    return post;
  }
}