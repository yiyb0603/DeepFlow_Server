import { EntityRepository, Repository } from "typeorm";
import Tags from "./tags.entity";

@EntityRepository(Tags)
export default class TagsRepository extends Repository<Tags> {
  public getTagsByPostIdx(postIdx: number): Promise<Tags[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getMany();
  }
}