import { EntityRepository, Repository } from "typeorm";
import { ITagAndPostCount } from 'types/tag.types';
import Tag from "./tag.entity";

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  public getTagsByPostIdx(postIdx: number): Promise<Tag[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }

  public getTags(): Promise<ITagAndPostCount[]> {
    return this.createQueryBuilder()
      .select('name')
      .addSelect('description')
      .addSelect('COUNT(name)', 'count')
      .groupBy('name, description')
      .execute();
  }
}