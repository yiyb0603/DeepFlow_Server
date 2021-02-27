import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import HttpError from "exception/HttpError";
import { PostEnums } from "lib/enum/post";
import Tags from "modules/tags/tags.entity";
import TagsRepository from "modules/tags/tags.repository";
import User from "modules/user/user.entity";
import UserRepository from "modules/user/user.repository";
import { PostDto } from "./dto/post.dto";
import PostEntity from "./post.entity";
import PostEntityRepository from "./post.repository";
import LikeEntityRepository from "modules/like/like.repository";
import LikeEntity from "modules/like/like.entity";
import View from "modules/view/view.entity";
import ViewRepository from "modules/view/view.repository";
import Comment from "modules/comment/comment.entity";
import CommentRepository from "modules/comment/comment.repository";
import { sha256 } from "js-sha256";

@Injectable()
export default class PostService {
  constructor(
    private readonly postRepository: PostEntityRepository,

    @InjectRepository(Tags)
    private readonly tagsRepository: TagsRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(LikeEntity)
    private readonly likeRepository: LikeEntityRepository,

    @InjectRepository(View)
    private readonly viewRepository: ViewRepository,

    @InjectRepository(Comment)
    private readonly commentRepository: CommentRepository,
  ) {}

  public async getPostsByCategory(category: PostEnums, page: number): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.getPostsByCategory(category, page);
    
    for (const post of posts) {
      let postTags: Tags[] = [];
      
      const tag: Tags[] = await this.tagsRepository.getTagsByPostIdx(post.idx);
      postTags = postTags.concat(tag);
      
      const user: User = await this.userRepository.getUserByIdx(post.fk_user_idx);
      post.user = user;

      post.postTags = postTags;
      post.commentCount = await this.commentRepository.getCommentsByPostIdx(post.idx)[1];
      post.likeCount = await this.likeRepository.getLikeCountByPostIdx(post.idx);
      post.viewCount = await this.viewRepository.getViewCountByPostIdx(post.idx);

      delete post.contents;
      delete post.user.description;
      delete post.user.joinedAt;
      delete post.user.location;
      delete post.user.recommandCount;

      await this.postRepository.save(post);
    }

    return posts;
  }

  public async getPost(postIdx: number, ipAddress: string): Promise<PostEntity> {
    const post: PostEntity = await this.getPostByIdx(postIdx);
    post.postTags = await this.tagsRepository.getTagsByPostIdx(postIdx);
    post.user = await this.userRepository.getUserByIdx(post.fk_user_idx);

    const existView: View = await this.viewRepository.getViewByPostIdxAndIpAdress(postIdx, sha256(ipAddress));
    if (existView === undefined) {
      const view: View = new View();
      view.post = post;
      view.userIp = sha256(ipAddress);

      await this.viewRepository.save(view);
    }

    return post;
  }

  public async handleCreatePost(createPostDto: PostDto, user: User): Promise<void> {
    const { title, contents, category, postTags } = createPostDto;
    const existUser: User = await this.userRepository.getUserById(user.githubId);

    if (existUser === undefined) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    const post: PostEntity = new PostEntity();
    post.user = existUser;
    post.title = title;
    post.contents = contents;
    post.category = category;

    await this.postRepository.save(post);

    await this.handlePushTags(postTags, post);
  }

  public async handleModifyPost(postIdx: number, modifyPostDto: PostDto, user: User) {
    const post: PostEntity = await this.getPostByIdx(postIdx);

    if (post.fk_user_idx !== user.idx) {
      throw new HttpError(403, '글을 수정할 권한이 없습니다.');
    }

    const { title, contents, postTags, category } = modifyPostDto;
    post.idx = postIdx;
    post.title = title;
    post.contents = contents;
    post.category = category;
    await this.postRepository.save(post);

    const existTags = await this.tagsRepository.getTagsByPostIdx(postIdx);
    await this.tagsRepository.remove(existTags);

    await this.handlePushTags(postTags, post);
  }

  public async handleDeletePost(postIdx: number, user: User) {
    const post: PostEntity = await this.getPostByIdx(postIdx);

    if (user.idx !== post.fk_user_idx) {
      throw new HttpError(403, '글을 삭제할 권한이 없습니다.');
    }

    await this.postRepository.remove(post);
  }

  public async getPostByIdx(postIdx: number): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.getPostByIdx(postIdx);

    if (post === undefined) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    return post;
  }

  public async handlePushTags(postTags: string[], post: PostEntity) {
    for (const postTag of postTags) {
      const tag: Tags = new Tags();
      tag.name = postTag;
      tag.post = post;

      await this.tagsRepository.save(tag);
    }
  }
}