import { EntityRepository, Repository } from 'typeorm';
import PostEntity from './post.entity';

@EntityRepository(PostEntity)
export default class PostEntityRepository extends Repository<PostEntity> {
  public countByIsTempFalse(): Promise<number> {
    return this.createQueryBuilder('post')
      .where('post.is_temp = false')
      .getCount();
  }

  public findAll(page: number, limit: number): Promise<PostEntity[]> {
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

  public findAllByTagName(tagName: string): Promise<PostEntity[]> {
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

  public findRecentPostsByIsTempFalse(count: number): Promise<PostEntity[]> {
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

  public findByIdx(idx: number): Promise<PostEntity> {
    return this.createQueryBuilder('post')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.replyCount', 'post.replies')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.viewCount', 'post.views')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.idx = :idx', { idx })
      .getOne();
  }

  public findAllByUserIdx(userIdx: number, isTemp: boolean): Promise<PostEntity[]> {
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

  public findAllByKeyword(keyword: string): Promise<PostEntity[]> {
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

  public findAllByUserCommented(userIdx: number): Promise<PostEntity[]> {
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