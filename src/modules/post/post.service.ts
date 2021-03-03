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
import View from "modules/view/view.entity";
import ViewRepository from "modules/view/view.repository";
import { sha256 } from "js-sha256";

@Injectable()
export default class PostService {
  constructor(
    private readonly postRepository: PostEntityRepository,

    @InjectRepository(Tags)
    private readonly tagsRepository: TagsRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(View)
    private readonly viewRepository: ViewRepository,
  ) {}

  public async getPostsByCategory(category: PostEnums, page: number): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.getPostsByCategory(category, page);
    await this.handleProcessPosts(posts);

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
      
      post.viewCount++;
      await this.postRepository.save(post);
    }

    return post;
  }

  public async handleSearchPost(keyword: string, category: PostEnums): Promise<PostEntity[]> {
    const searchPosts: PostEntity[] = await this.postRepository.getPostsByKeyword(keyword, category);
    await this.handleProcessPosts(searchPosts);

    return searchPosts;
  }

  public async getPostsByUserIdx(userIdx: number) {
    const userPosts: PostEntity[] = await this.postRepository.getPostsByUserIdx(userIdx);
    return userPosts;
  }

  public async handleCreatePost(createPostDto: PostDto, user: User): Promise<void> {
    const { introduction, thumbnail, title, contents, category, postTags } = createPostDto;
    const existUser: User = await this.userRepository.getUserByIdx(user.idx);

    if (existUser === undefined) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    const post: PostEntity = new PostEntity();
    post.user = existUser;
    post.title = title;
    post.introduction = introduction;
    post.thumbnail = thumbnail;
    post.contents = contents;
    post.category = category;

    await this.postRepository.save(post);

    await this.handlePushTags(postTags, post);
  }

  public async handleModifyPost(postIdx: number, modifyPostDto: PostDto, user: User): Promise<void> {
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

  public async handleDeletePost(postIdx: number, user: User): Promise<void> {
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

  private async handleProcessPosts(posts: PostEntity[]): Promise<void> {
    for (const post of posts) {
      let postTags: Tags[] = [];
      
      const tag: Tags[] = await this.tagsRepository.getTagsByPostIdx(post.idx);
      postTags = postTags.concat(tag);
      
      const user: User = await this.userRepository.getUserByIdx(post.fk_user_idx);
      post.user = user;

      post.postTags = postTags;

      delete post.contents;
      delete post.user.description;
      delete post.user.joinedAt;
      delete post.user.location;
      delete post.user.recommandCount;

      await this.postRepository.save(post);
    }
  }

  private async handlePushTags(postTags: string[], post: PostEntity): Promise<void> {
    for (const postTag of postTags) {
      const tag: Tags = new Tags();
      tag.name = postTag;
      tag.post = post;

      await this.tagsRepository.save(tag);
    }
  }
}