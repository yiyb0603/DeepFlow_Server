import { EntityRepository, Repository } from 'typeorm';
import LikeEntity from './like.entity';

@EntityRepository(LikeEntity)
export default class LikeEntityRepository extends Repository<LikeEntity> {
  public findAllByPostIdx(postIdx: number): Promise<LikeEntity[]> {
    return this.createQueryBuilder('like')
      .leftJoinAndSelect('like.user', 'user')
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }

  public countByPostIdx(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getCount();
  }

  public findByIdx(likeIdx: number) {
    return this.createQueryBuilder()
      .where('idx = :likeIdx', { likeIdx })
      .getOne();
  }

  public findByUserIdx(postIdx: number, userIdx: number): Promise<LikeEntity> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .andWhere('fk_user_idx = :userIdx', { userIdx })
      .getOne();
  }
}