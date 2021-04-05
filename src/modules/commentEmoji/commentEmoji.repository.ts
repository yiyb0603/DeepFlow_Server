import { EntityRepository, Repository } from 'typeorm';
import CommentEmoji from './commentEmoji.entity';

@EntityRepository(CommentEmoji)
export default class CommentEmojiRepository extends Repository<CommentEmoji> {
  public getCommentEmojiesByCommentIdx(commentIdx: number): Promise<CommentEmoji[]> {
    return this.createQueryBuilder()
      .select('COUNT(emoji)', 'count')
      .addSelect('emoji')
      .where('fk_comment_idx = :commentIdx', { commentIdx })
      .groupBy('emoji')
      .execute();
  }

  public async getEmojiByIdx(emojiIdx: number): Promise<CommentEmoji> {
    return this.createQueryBuilder()
      .where('idx = :emojiIdx', { emojiIdx })
      .getOne();
  }

  public getEmojiesByEmoji(commentIdx: number, emoji: string): Promise<CommentEmoji[]> {
    return this.createQueryBuilder()
      .where('fk_comment_idx = :commentIdx', { commentIdx })
      .andWhere('emoji = :emoji', { emoji })
      .getMany();
  }
}