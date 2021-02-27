import { EntityRepository, Repository } from "typeorm";
import Comment from "./comment.entity";

@EntityRepository(Comment)
export default class CommentRepository extends Repository<Comment> {
  public getCommentsByPostIdx(postIdx: number): Promise<[Comment[], number]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getManyAndCount();
  }

  public getCommentByIdx(commentIdx: number): Promise<Comment> {
    return this.createQueryBuilder()
      .where('idx = :commentIdx', { commentIdx })
      .getOne();
  }
}