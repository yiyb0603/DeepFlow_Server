import { Controller, Get, Param, Query } from '@nestjs/common';
import { ETagSort } from 'lib/enum/tag';
import { ITagAndPostCount } from 'types/tag.types';
import Tag from './tag.entity';
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

  @Get('/:tag')
  public async getTagByTagName(
    @Param('tag') tagName: string,
  ) {
    const tag: Tag = await this.tagService.getTagByTagName(tagName);

    return {
      status: 200,
      message: '태그 조회를 성공하였습니다.',
      data: {
        tag,
      },
    };
  }
}