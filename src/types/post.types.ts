import PostEntity from 'modules/post/post.entity';

export interface IPostsResponse {
  totalCount: number;
  totalPage: number;
  posts: PostEntity[];
}