import { EntityRepository, Repository } from "typeorm"
import LikeEntity from "./like.entity";

@EntityRepository(LikeEntity)
export default class LikeEntityRepository extends Repository<LikeEntity> {
  public getLikeListByPostIdx(postIdx: number): Promise<LikeEntity[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }

  public getLikeCountByPostIdx(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getCount();
  }

  public getLikeByIdx(likeIdx: number) {
    return this.createQueryBuilder()
      .where('idx = :likeIdx', { likeIdx })
      .getOne();
  }

  public getLikeByUserIdx(postIdx: number, userIdx: number): Promise<LikeEntity> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .andWhere('fk_user_idx = :userIdx', { userIdx })
      .getOne();
  }
}