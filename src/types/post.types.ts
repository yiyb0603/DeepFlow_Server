import PostEntity from 'modules/post/post.entity';

export interface IPostsAndCount {
  totalCount: number;
  posts: PostEntity[];
}