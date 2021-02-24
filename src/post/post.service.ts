import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import HttpError from "exception/HttpError";
import { PostEnums } from "lib/enum/post";
import Tags from "tags/tags.entity";
import TagsRepository from "tags/tags.repository";
import User from "user/user.entity";
import UserRepository from "user/user.repository";
import { CreatePostDto } from "./dto/post.dto";
import PostEntity from "./post.entity";
import PostEntityRepository from "./post.repository";

@Injectable()
export default class PostService {
  constructor(
    private readonly postRepository: PostEntityRepository,

    @InjectRepository(Tags)
    private readonly tagsRepository: TagsRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async getPostsByCategory(category: PostEnums): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.postRepository.getPostsByCategory(category.toString());
    
    for (const post of posts) {
      let postTags: Tags[] = [];
      
      const tag = await this.tagsRepository.getTagsByPostIdx(post.idx);
      postTags = postTags.concat(tag);
      
      post.postTags = postTags;
    }

    return posts;
  }

  public async getPost(postIdx: number): Promise<PostEntity> {
    const post = await this.postRepository.getPostByIdx(postIdx);
    if (!post) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    return post;
  }

  public async handleCreatePost(createPostDto: CreatePostDto): Promise<void> {
    const { userIdx, title, contents, category, postTags } = createPostDto;

    const user: User = await this.userRepository.getUserByIdx(userIdx);

    const post: PostEntity = new PostEntity();
    post.user = user;
    post.title = title;
    post.contents = contents;
    post.category = category;

    await this.postRepository.save(post);

    for (const postTag of postTags) {
      const tag: Tags = new Tags();
      tag.name = postTag;
      tag.post = post;

      await this.tagsRepository.save(tag);
    }
  }

  public async handleDeletePost(idx: number) {
    const post: PostEntity = await this.postRepository.getPostByIdx(idx);

    if (!post) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    await this.postRepository.remove(post);
  }
}