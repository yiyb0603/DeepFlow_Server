import { Controller, Get, Query } from '@nestjs/common';
import { ETagSort } from 'lib/enum/tag';
import { ITagAndPostCount } from 'types/tag.types';
import TagService from './tag.service';

@Controller('tag')
export default class TagController {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @Get('/')
  public async getTags(
    @Query('sort') sort: ETagSort,
  ) {
    const tagAndCounts: ITagAndPostCount[] = await this.tagService.getTagsAndPostCount(sort);

    return {
      status: 200,
      message: '태그 목록 조회를 성공하였습니다.',
      data: {
        tags: tagAndCounts,
      },
    };
  }
}