import { EntityRepository, Repository } from 'typeorm';
import { ETagSort } from 'lib/enum/tag';
import { ITagAndPostCount } from 'types/tag.types';
import Tag from './tag.entity';

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  public getTagsByPostIdx(postIdx: number): Promise<Tag[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }

  public getTags(sort: ETagSort): Promise<ITagAndPostCount[]> {
    const column: string = (sort === ETagSort.POPULAR ? 'count' : 'name');
    const order: 'DESC' | 'ASC' = (column === 'count') ? 'DESC' : 'ASC';

    return this.createQueryBuilder()
      .select('name')
      .addSelect('description')
      .addSelect('COUNT(name)', 'count')
      .orderBy(column, order)
      .groupBy('name, description')
      .execute();
  }
}