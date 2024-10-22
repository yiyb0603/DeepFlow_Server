import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sha256 } from 'js-sha256';
import HttpError from 'exception/HttpError';
import { PAGE_LIMIT } from 'lib/constants';
import NoticeView from 'modules/noticeView/noticeView.entity';
import NoticeViewRepository from 'modules/noticeView/noticeView.repository';
import User from 'modules/user/user.entity';
import UserRepository from 'modules/user/user.repository';
import { NoticeDto } from './dto/notice.dto';
import Notice from './notice.entity';
import NoticeRepository from './notice.repository';

@Injectable()
export default class NoticeService {
  constructor(
    private readonly noticeRepository: NoticeRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(NoticeView)
    private readonly noticeViewRepository: NoticeViewRepository,
  ) { }

  public async getNotices(page: number): Promise<Notice[]> {
    const notices: Notice[] = await this.noticeRepository.findAll(page, PAGE_LIMIT);
    return notices;
  }

  public async getNotice(noticeIdx: number, ipAdress?: string): Promise<Notice> {
    const notice: Notice = await this.noticeRepository.findByIdx(noticeIdx);

    if (notice === undefined) {
      throw new HttpError(404, '존재하지 않는 공지사항 입니다.');
    }

    if (ipAdress !== undefined) {
      const existNoticeView: NoticeView = await this.noticeViewRepository.findByNoticeIdxAndIpAddress(noticeIdx, sha256(ipAdress));

      if (existNoticeView === undefined) {
        const noticeView: NoticeView = new NoticeView();
        noticeView.fk_notice_idx = noticeIdx;
        noticeView.notice = notice;
        noticeView.userIp = sha256(ipAdress);

        await this.noticeViewRepository.save(noticeView);
      }
    }

    return notice;
  }

  public async handleCreateNotice(createNoticeDto: NoticeDto, user: User): Promise<void> {
    if (!user.isAdmin) {
      throw new HttpError(403, '공지사항을 작성할 권한이 없습니다.');
    }

    const existUser: User = await this.userRepository.findByIdx(user.idx);
    if (existUser === undefined) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    const { title, contents } = createNoticeDto;
    const notice: Notice = new Notice();
    notice.title = title;
    notice.contents = contents;
    notice.user = existUser;
    notice.createdAt = new Date();
    notice.updatedAt = null;

    await this.noticeRepository.save(notice);
  }

  public async handleModifyNotice(noticeIdx: number, modifyNoticeDto: NoticeDto, user: User): Promise<void> {
    const existNotice: Notice = await this.getNotice(noticeIdx);

    if (!user.isAdmin || existNotice.fk_user_idx !== user.idx) {
      throw new HttpError(403, '공지사항을 수정할 권한이 없습니다.');
    }

    const { title, contents } = modifyNoticeDto;
    existNotice.title = title;
    existNotice.contents = contents;
    existNotice.updatedAt = new Date();

    await this.noticeRepository.save(existNotice);
  }

  public async handleDeleteNotice(noticeIdx: number, user: User): Promise<void> {
    const existNotice: Notice = await this.getNotice(noticeIdx);

    if (!user.isAdmin || existNotice.fk_user_idx !== user.idx) {
      throw new HttpError(403, '공지사항을 삭제할 권한이 없습니다.');
    }

    await this.noticeRepository.remove(existNotice);
  }
}