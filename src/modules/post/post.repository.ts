import { EntityRepository, Repository } from 'typeorm';
import PostEntity from './post.entity';
import { EPost } from 'lib/enum/post';

@EntityRepository(PostEntity)
export default class PostEntityRepository extends Repository<PostEntity> {
  public getPostCountByCategory(category: EPost): Promise<number> {
    return this.createQueryBuilder()
      .where('category = :category', { category: category.toString() })
      .andWhere('is_temp = false')
      .getCount();
  }

  public getPostsByCategory(category: EPost): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.category = :category', { category: category.toString() })
      .andWhere('post.is_temp = false')
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  public getPostsByPage(category: EPost, page: number, limit: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('post.category = :category', { category: category.toString() })
      .andWhere('post.is_temp = false')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  public getPostsByTagName(tagName: string, category: EPost): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoin('post.postTags', 'tag')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('tag.name = :tagName', { tagName })
      .andWhere('post.category = :category', { category })
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  public getRecentPostsByCount(count: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('post.is_temp = false')
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
      .andWhere('post.is_temp = :isTemp', { isTemp })
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  public getPostsByKeyword(keyword: string, category: EPost): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .where('post.title LIKE :keyword', { keyword: `%${keyword}%` })
      .andWhere('post.category = :category', { category: category.toString() })
      .orderBy('post.created_at', 'DESC')
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
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }
}