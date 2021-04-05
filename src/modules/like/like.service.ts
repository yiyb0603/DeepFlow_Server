import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostService from "modules/post/post.service";
import User from "modules/user/user.entity";
import UserRepository from "modules/user/user.repository";
import HttpError from "exception/HttpError";
import { LikeDto } from "./dto/like.dto";
import LikeEntity from "./like.entity";
import LikeEntityRepository from "./like.repository";
import PostEntity from "modules/post/post.entity";

@Injectable()
export default class LikeService {
  constructor(
    private readonly likeRepository: LikeEntityRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    private readonly postService: PostService,
  ) {}

  public async getLikeList(postIdx: number): Promise<LikeEntity[]> {
    await this.postService.getPostByIdx(postIdx);
    const likes: LikeEntity[] = await this.likeRepository.getLikeListByPostIdx(postIdx);

    for (const like of likes) {
      like.user = await this.userRepository.getUserByIdx(like.fk_user_idx);
    }

    return likes;
  }

  public async handleAddLike(addLikeDto: LikeDto, user: User): Promise<void> {
    const { postIdx } = addLikeDto;
    const existLike: LikeEntity = await this.getLikeByUserIdx(postIdx, user);
    const existPost: PostEntity = await this.postService.getPostByIdx(postIdx);

    if (existLike !== undefined) {
      throw new HttpError(409, '이미 좋아요를 누른 글입니다.');
    }

    const like: LikeEntity = new LikeEntity();
    like.user = user;
    like.post = existPost;
    like.pressedAt = new Date();

    await this.likeRepository.save(like);
  }

  public async handleDeleteLike(postIdx, likeIdx: number, user: User): Promise<void> {
    const like: LikeEntity = await this.getLikeByIdx(likeIdx);
    const existPost: PostEntity = await this.postService.getPostByIdx(postIdx);

    if (like.fk_user_idx !== user.idx) {
      throw new HttpError(403, '좋아요를 삭제할 권한이 없습니다.');
    }

    await this.likeRepository.remove(like);
  }

  public async getLikeByIdx(likeIdx: number): Promise<LikeEntity> {
    const like: LikeEntity = await this.likeRepository.getLikeByIdx(likeIdx);

    if (like === undefined) {
      throw new HttpError(404, '해당 좋아요가 존재하지 않습니다.');
    }

    return like;
  }

  public async getLikeByUserIdx(postIdx: number, user: User): Promise<LikeEntity> {
    const like: LikeEntity = await this.likeRepository.getLikeByUserIdx(postIdx, user.idx);
    return like;
  }
}