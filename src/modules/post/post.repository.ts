import { EntityRepository, Repository } from 'typeorm';
import { EPostSort } from 'lib/enum/post';
import PostEntity from './post.entity';

@EntityRepository(PostEntity)
export default class PostEntityRepository extends Repository<PostEntity> {
  public getPostsCount(): Promise<number> {
    return this.createQueryBuilder('post')
      .where('post.is_temp = false')
      .getCount();
  }

  public getPostsByPage(page: number, limit: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views', 'viewCount')
      .where('post.isTemp = false')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  public getPostsByTagName(tagName: string): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoin('post.postTags', 'tag')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('tag.name = :tagName', { tagName })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  public getRecentPostsByCount(count: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('post.isTemp = false')
      .skip(0)
      .take(count)
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  public getPostByIdx(idx: number): Promise<PostEntity> {
    return this.createQueryBuilder('post')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.idx = :idx', { idx })
      .getOne();
  }

  public getPostsByUserIdx(userIdx: number, isTemp: boolean): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('post.fk_user_idx = :userIdx', { userIdx })
      .andWhere('post.isTemp = :isTemp', { isTemp })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  public getPostsByKeyword(keyword: string): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('post.title LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  public getPostsByUserCommented(userIdx: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoin('post.comments', 'comment')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postTags', 'tag')
      .where('comment.fk_user_idx = :userIdx', { userIdx })
      .groupBy('user.idx')
      .addGroupBy('tag.idx')
      .addGroupBy('post.idx')
      .addGroupBy('comment.idx')
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }
}