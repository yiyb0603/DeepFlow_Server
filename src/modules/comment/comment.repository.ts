import { EntityRepository, Repository } from 'typeorm';
import Comment from './comment.entity';

@EntityRepository(Comment)
export default class CommentRepository extends Repository<Comment> {
  public findAllByPostIdx(postIdx: number): Promise<Comment[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  public findByIdx(commentIdx: number): Promise<Comment> {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.idx = :commentIdx', { commentIdx })
      .getOne();
  }

  public findAllByUserIdx(userIdx: number): Promise<Comment[]> {
    return this.createQueryBuilder()
      .where('fk_user_idx = :userIdx', { userIdx })
      .distinctOn(['fk_post_idx'])
      .getMany();
  }
}