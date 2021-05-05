import { EntityRepository, Repository } from 'typeorm';
import NoticeView from './noticeView.entity';

@EntityRepository(NoticeView)
export default class NoticeViewRepository extends Repository<NoticeView> {
  public getNoticeViewByNoticeIdxAndIpAddress(noticeIdx: number, ipAdress: string): Promise<NoticeView> {
    return this.createQueryBuilder()
      .where('fk_notice_idx = :noticeIdx', { noticeIdx })
      .andWhere('user_ip = :ipAdress', { ipAdress })
      .getOne();
  }
}