import { PostEnums } from "lib/enum/post";
import { EntityRepository, Repository } from "typeorm";
import PostEntity from "./post.entity";

@EntityRepository(PostEntity)
export default class PostRepository extends Repository<PostEntity> {
  public getPostsByCategory(category: string): Promise<PostEntity[]> {
    return this.createQueryBuilder()
      .where('category = :category', { category })
      .getMany();
  }

  public getPostByIdx(idx: number): Promise<PostEntity> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }
}