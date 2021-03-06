import { EntityRepository, Repository } from "typeorm";
import PostEntity from "./post.entity";
import { PostEnums } from "lib/enum/post";

@EntityRepository(PostEntity)
export default class PostEntityRepository extends Repository<PostEntity> {
  public getPostsByCategory(category: PostEnums, page: number, limit: number): Promise<PostEntity[]> {
    return this.createQueryBuilder()
      .where('category = :category', { category: category.toString() })
      .andWhere('is_temp = false')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  public getPostByIdx(idx: number): Promise<PostEntity> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }

  public getPostsByUserIdx(userIdx: number, isTemp: boolean): Promise<PostEntity[]> {
    return this.createQueryBuilder()
      .where('fk_user_idx = :userIdx', { userIdx })
      .andWhere('is_temp = :isTemp', { isTemp })
      .getMany();
  }

  public getPostsByKeyword(keyword: string, category: PostEnums): Promise<PostEntity[]> {
    return this.createQueryBuilder()
      .where('title LIKE :keyword', { keyword: `%${keyword}%` })
      .andWhere('category = :category', { category: category.toString() })
      .getMany();
  }
}