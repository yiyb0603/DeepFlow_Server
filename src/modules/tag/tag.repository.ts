import { EntityRepository, Repository } from "typeorm";
import Tag from "./tag.entity";

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  public getTagsByPostIdx(postIdx: number): Promise<Tag[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }
}