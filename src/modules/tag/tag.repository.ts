import { EntityRepository, Repository } from 'typeorm';
import { ETagSort } from 'lib/enum/tag';
import { ITagAndPostCount } from 'types/tag.types';
import Tag from './tag.entity';

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  public findAllByPostIdx(postIdx: number): Promise<Tag[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }

  public findByTagName(tagName: string): Promise<Tag> {
    return this.createQueryBuilder()
      .where('name = :tagName', { tagName })
      .getOne();
  }

  public findAll(sort: ETagSort): Promise<ITagAndPostCount[]> {
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