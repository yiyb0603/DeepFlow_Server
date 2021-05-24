import { EntityRepository, Repository } from 'typeorm';
import CommentEmoji from './commentEmoji.entity';

@EntityRepository(CommentEmoji)
export default class CommentEmojiRepository extends Repository<CommentEmoji> {
  public findAllByCommentIdx(commentIdx: number): Promise<CommentEmoji[]> {
    return this.createQueryBuilder()
      .select('COUNT(emoji)', 'count')
      .addSelect('emoji')
      .where('fk_comment_idx = :commentIdx', { commentIdx })
      .groupBy('emoji')
      .execute();
  }

  public async findByIdx(emojiIdx: number): Promise<CommentEmoji> {
    return this.createQueryBuilder()
      .where('idx = :emojiIdx', { emojiIdx })
      .getOne();
  }

  public async findByEmojiAndCommentIdxAndUserIdx(emoji: string, commentIdx: number, userIdx: number): Promise<CommentEmoji> {
    return this.createQueryBuilder()
      .where('emoji = :emoji', { emoji })
      .andWhere('fk_comment_idx = :commentIdx', { commentIdx })
      .andWhere('fk_user_idx = :userIdx', { userIdx })
      .getOne();
  }

  public findAllByEmoji(commentIdx: number, emoji: string): Promise<CommentEmoji[]> {
    return this.createQueryBuilder()
      .where('fk_comment_idx = :commentIdx', { commentIdx })
      .andWhere('emoji = :emoji', { emoji })
      .getMany();
  }
}