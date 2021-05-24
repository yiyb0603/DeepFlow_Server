import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sha256 } from 'js-sha256';
import HttpError from 'exception/HttpError';
import Tag from 'modules/tag/tag.entity';
import TagRepository from 'modules/tag/tag.repository';
import User from 'modules/user/user.entity';
import UserRepository from 'modules/user/user.repository';
import { PostDto } from './dto/post.dto';
import PostEntity from './post.entity';
import PostEntityRepository from './post.repository';
import View from 'modules/view/view.entity';
import ViewRepository from 'modules/view/view.repository';
import TagService from 'modules/tag/tag.service';
import { PAGE_LIMIT } from 'lib/constants';
import { IViewCount } from 'types/view.types';
import { IPostsResponse } from 'types/post.types';
import { EPostSort } from 'lib/enum/post';

@Injectable()
export default class PostService {
  constructor(
    private readonly postRepository: PostEntityRepository,

    @InjectRepository(Tag)
    private readonly tagRepository: TagRepository,

    private readonly tagService: TagService,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(View)
    private readonly viewRepository: ViewRepository,
  ) {}

  public async getPostsBySort(sort: EPostSort, page: number): Promise<IPostsResponse> {
    if (!page || page <= 0) {
      throw new HttpError(400, '검증 오류입니다.');
    }

    const posts: PostEntity[] = await this.postRepository.findAll(page, PAGE_LIMIT);
    await this.handleProcessPost(posts);

    const totalCount: number = await this.postRepository.countByIsTempFalse();
    const totalPage: number = Math.ceil(totalCount / PAGE_LIMIT);

    if (sort === EPostSort.POPULAR) {
      posts.sort((a, b) => b.viewCount - a.viewCount);
    }

    return {
      totalCount,
      totalPage,
      posts,
    };
  }

  public async getPostsByTagName(tagName: string): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.findAllByTagName(tagName);
    await this.handleProcessPost(posts);
    return posts;
  }

  public async getTempPosts(user: User): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.findAllByUserIdx(user.idx, true);
    await this.handleProcessPost(posts);
    return posts;
  }

  public async getRecentPosts(count: number): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.findRecentPostsByIsTempFalse(count);
    await this.handleProcessPost(posts);
    return posts;
  }

  public async getPopularPosts(count: number): Promise<PostEntity[]> {
    const popularViews: IViewCount[] = await this.viewRepository.getCountGroupByPostIdx(count);
    const posts: PostEntity[] = [];

    for (const view of popularViews) {
      const post: PostEntity = await this.getPostByIdx(view.fk_post_idx);

      delete post.contents;
      delete post.fk_user_idx;

      posts.push(post);
    }

    return posts;
  }

  public async getPost(postIdx: number, ipAddress: string): Promise<PostEntity> {
    const post: PostEntity = await this.getPostByIdx(postIdx);
    const postTags: Tag[] = await this.tagRepository.findAllByPostIdx(postIdx);
    post.postTags = postTags.map((tag: Tag) => tag.name);
    post.user = await this.userRepository.findByIdx(post.fk_user_idx);

    const existView: View = await this.viewRepository.findByPostIdxAndIpAdress(postIdx, sha256(ipAddress));
    if (existView === undefined && !post.isTemp) {
      const view: View = new View();
      view.post = post;
      view.userIp = sha256(ipAddress);

      await this.viewRepository.save(view);
    }

    return post;
  }

  public async handleSearchPost(keyword: string): Promise<PostEntity[]> {
    const searchPosts: PostEntity[] = await this.postRepository.findAllByKeyword(keyword);
    await this.handleProcessPost(searchPosts);
    return searchPosts;
  }

  public async getPostsByUserIdx(userIdx: number): Promise<PostEntity[]> {
    const userPosts: PostEntity[] = await this.postRepository.findAllByUserIdx(userIdx, false);
    await this.handleProcessPost(userPosts);
    return userPosts;
  }

  public async handleCreatePost(createPostDto: PostDto, user: User): Promise<number> {
    const { introduction, thumbnail, title, contents, postTags, isTemp } = createPostDto;
    const existUser: User = await this.userRepository.findByIdx(user.idx);

    if (existUser === undefined) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    const post: PostEntity = new PostEntity();
    post.user = existUser;
    post.title = title;
    post.introduction = introduction;
    post.thumbnail = thumbnail;
    post.contents = contents;
    post.isTemp = isTemp;
    post.updatedAt = null;

    if (!isTemp) {
      if (!thumbnail || !introduction) {
        throw new HttpError(400, '검증 오류입니다.');
      }
    }

    const { idx } = await this.postRepository.save(post);
    await this.tagService.handlePushTags(postTags, post);

    return idx;
  }

  public async handleModifyPost(postIdx: number, modifyPostDto: PostDto, user: User): Promise<void> {
    const post: PostEntity = await this.getPostByIdx(postIdx);

    if (post.fk_user_idx !== user.idx) {
      throw new HttpError(403, '글을 수정할 권한이 없습니다.');
    }

    const { title, thumbnail, contents, postTags, introduction, isTemp } = modifyPostDto;
    post.idx = postIdx;
    post.title = title;
    post.thumbnail = thumbnail;
    post.introduction = introduction;
    post.contents = contents;
    post.isTemp = isTemp;
    post.updatedAt = new Date();
    await this.postRepository.save(post);

    const existTags = await this.tagRepository.findAllByPostIdx(postIdx);
    await this.tagRepository.remove(existTags);

    await this.tagService.handlePushTags(postTags, post);
  }

  public async handleDeletePost(postIdx: number, user: User): Promise<void> {
    const post: PostEntity = await this.getPostByIdx(postIdx);

    if (user.idx !== post.fk_user_idx) {
      throw new HttpError(403, '글을 삭제할 권한이 없습니다.');
    }

    await this.postRepository.remove(post);
  }

  public async getPostByIdx(postIdx: number): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.findByIdx(postIdx);
    if (post === undefined) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    return post;
  }

  public async getPostsByUserCommented(userIdx: number): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.findAllByUserCommented(userIdx);
    await this.handleProcessPost(posts);
    return posts;
  }

  private async handleProcessPost(posts: PostEntity[]): Promise<void> {
    for (const post of posts) {
      const postTags = await this.tagRepository.findAllByPostIdx(post.idx);
      post.postTags = postTags.map((tag) => tag.name);
    }
  }
}