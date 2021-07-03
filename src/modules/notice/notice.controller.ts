import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IpAddress } from 'lib/decorator/ipAddress.decorator';
import { Token } from 'lib/decorator/user.decorator';
import AuthGuard from 'middleware/auth';
import User from 'modules/user/user.entity';
import { NoticeDto } from './dto/notice.dto';
import Notice from './notice.entity';
import NoticeService from './notice.service';

@Controller('notice')
export default class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
  ) {}
  
  @Get('/')
  public async getNotices(
    @Query('page') page: number,
  ) {
    const notices: Notice[] = await this.noticeService.getNotices(page);

    return {
      status: 200,
      message: '공지사항 목록을 조회하였습니다.',
      data: {
        notices,
      },
    };
  }

  @Get('/:idx')
  public async getNotice(
    @IpAddress() ipAdress: string,
    @Param('idx') noticeIdx: number,
  ) {
    const notice: Notice = await this.noticeService.getNotice(noticeIdx, ipAdress);

    return {
      status: 200,
      message: '공지사항을 조회하였습니다.',
      data: {
        notice,
      },
    };
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleCreateNotice(
    @Token() user: User,
    @Body() createNoticeDto: NoticeDto,
  ) {
    await this.noticeService.handleCreateNotice(createNoticeDto, user);

    return {
      status: 200,
      message: '공지사항을 생성하였습니다.',
    };
  }

  @Put('/:idx')
  @UseGuards(new AuthGuard())
  public async handleModifyNotice(
    @Token() user: User,
    @Param('idx') noticeIdx: number,
    @Body() modifyNoticeDto: NoticeDto,
  ) {
    await this.noticeService.handleModifyNotice(noticeIdx, modifyNoticeDto, user);

    return {
      status: 200,
      message: '공지사항을 수정하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeleteNotice(
    @Token() user: User,
    @Param('idx') noticeIdx: number,
  ) {
    await this.noticeService.handleDeleteNotice(noticeIdx, user);

    return {
      status: 200,
      message: '공지사항을 삭제하였습니다.',
    };
  }
}