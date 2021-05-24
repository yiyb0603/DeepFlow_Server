import { EntityRepository, Repository } from 'typeorm';
import Notice from './notice.entity';

@EntityRepository(Notice)
export default class NoticeRepository extends Repository<Notice> {
  public findAll(page: number, limit: number): Promise<Notice[]> {
    return this.createQueryBuilder('notice')
      .select('notice.idx')
      .addSelect('notice.title')
      .addSelect('notice.createdAt')
      .addSelect('notice.updatedAt')
      .loadRelationCountAndMap('notice.viewCount', 'notice.views')
      .leftJoinAndSelect('notice.user', 'user')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('notice.createdAt', 'DESC')
      .getMany();
  }

  public findByIdx(noticeIdx: number): Promise<Notice> {
    return this.createQueryBuilder('notice')
      .leftJoinAndSelect('notice.user', 'user')
      .where('notice.idx = :noticeIdx', { noticeIdx })
      .getOne();
  }
}