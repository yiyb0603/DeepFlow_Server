import { EntityRepository, Repository } from 'typeorm';
import Recommand from './recommand.entity';

@EntityRepository(Recommand)
export default class RecommandRepository extends Repository<Recommand> {
  public findAllByUserIdx(userIdx: number): Promise<Recommand[]> {
    return this.createQueryBuilder('recommand')
      .leftJoinAndSelect('recommand.pressedUser', 'user')
      .where('recommand.fk_user_idx = :userIdx', { userIdx })
      .orderBy('recommand.recommand_at', 'DESC')
      .getMany();
  }

  public findByPressedUserIdx(userIdx: number, pressedUserIdx: number): Promise<Recommand> {
    return this.createQueryBuilder()
      .where('fk_pressed_user_idx = :pressedUserIdx', { pressedUserIdx })
      .andWhere('fk_user_idx = :userIdx', { userIdx })
      .getOne();
  }

  public findByIdx(recommandIdx: number): Promise<Recommand> {
    return this.createQueryBuilder()
      .where('idx = :recommandIdx', { recommandIdx })
      .getOne();
  }

  public countByUserIdx(userIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_user_idx = :userIdx', { userIdx })
      .getCount();
  }
}