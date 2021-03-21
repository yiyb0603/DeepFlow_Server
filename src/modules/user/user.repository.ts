import { EntityRepository, Repository } from "typeorm";
import User from "./user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public getUserById(id: string): Promise<User> {
    return this.createQueryBuilder()
      .where('github_id = :id', { id })
      .getOne();
  }

  public getUserByIdx(idx: number): Promise<User> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }

  public getUserList(): Promise<User[]> {
    return this.createQueryBuilder()
      .orderBy('generation', 'ASC')
      .getMany();
  }
}