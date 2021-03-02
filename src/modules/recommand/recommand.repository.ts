import { EntityRepository, Repository } from "typeorm";
import Recommand from "./recommand.entity";

@EntityRepository(Recommand)
export default class RecommandRepository extends Repository<Recommand> {
  public getRecommandByPressedUserIdx(userIdx: number, pressedUserIdx: number): Promise<Recommand> {
    return this.createQueryBuilder()
      .where('fk_pressed_user_idx = :pressedUserIdx', { pressedUserIdx })
      .andWhere('fk_user_idx = :userIdx', { userIdx })
      .getOne();
  }

  public getRecommandByIdx(recommandIdx: number): Promise<Recommand> {
    return this.createQueryBuilder()
      .where('idx = :recommandIdx', { recommandIdx })
      .getOne();
  }
}