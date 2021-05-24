import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public findById(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.github_id = :id', { id })
      .getOne();
  }

  public findByIdx(idx: number): Promise<User> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }

  public findAll(): Promise<User[]> {
    return this.createQueryBuilder()
      .orderBy('generation', 'ASC')
      .addOrderBy('name', 'ASC')
      .getMany();
  }
}