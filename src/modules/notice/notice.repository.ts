import { EntityRepository, Repository } from "typeorm";
import Notice from "./notice.entity";

@EntityRepository(Notice)
export default class NoticeRepository extends Repository<Notice> {
  public getNoticesByPage(page: number, limit: number): Promise<Notice[]> {
    return this.createQueryBuilder()
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  public getNoticeByIdx(noticeIdx: number): Promise<Notice> {
    return this.createQueryBuilder()
      .where('idx = :noticeIdx', { noticeIdx })
      .getOne();
  }
}