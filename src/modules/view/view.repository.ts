import { EntityRepository, Repository } from "typeorm";
import { IViewCount } from "types/view.types";
import View from "./view.entity";

@EntityRepository(View)
export default class ViewRepository extends Repository<View> {
  public findByPostIdxAndIpAdress(postIdx: number, ipAddress: string): Promise<View> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .andWhere('user_ip = :ipAddress', { ipAddress })
      .getOne();
  }

  public countByPostIdx(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getCount();
  }

  public getCountGroupByPostIdx(count: number): Promise<IViewCount[]> {
    return this.createQueryBuilder()
      .select('fk_post_idx')
      .addSelect('COUNT(*)', 'count')
      .groupBy('fk_post_idx')
      .orderBy('COUNT(*)', 'DESC')
      .skip(0)
      .take(count)
      .execute();
  }
}