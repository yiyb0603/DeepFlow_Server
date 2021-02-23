import { EntityRepository, Repository } from "typeorm";
import User from "./user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public findById(id: string): Promise<User> {
    return this.createQueryBuilder().where('github_id = :id', { id }).getOne();
  }

  public findByUserIdx(idx: number): Promise<User> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }
}