import { PostEnums } from "lib/enum/post";
import { EntityRepository, Repository } from "typeorm";
import PostEntity from "./post.entity";

@EntityRepository(PostEntity)
export default class PostEntityRepository extends Repository<PostEntity> {
  public getPostsByCategory(category: PostEnums): Promise<PostEntity[]> {
    return this.createQueryBuilder()
      .where('category = :category', { category: category.toString() })
      .getMany();
  }

  public getPostByIdx(idx: number): Promise<PostEntity> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }
}