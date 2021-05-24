import { EntityRepository, Repository } from 'typeorm';
import Reply from './reply.entity';

@EntityRepository(Reply)
export default class ReplyRepository extends Repository<Reply> {
  public findAllByPostIdx(postIdx: number): Promise<Reply[]> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  public findAllByCommentIdx(commentIdx: number): Promise<Reply[]> {
    return this.createQueryBuilder('reply')
      .leftJoinAndSelect('reply.user', 'user')
      .where('reply.fk_comment_idx = :commentIdx', { commentIdx })
      .getMany();
  }

  public findByIdx(replyIdx: number): Promise<Reply> {
    return this.createQueryBuilder()
      .where('idx = :replyIdx', { replyIdx })
      .getOne();
  }
}