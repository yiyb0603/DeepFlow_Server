import { Controller, Get } from '@nestjs/common';
import { ITagAndPostCount } from 'types/tag.types';
import TagService from './tag.service';

@Controller('tag')
export default class TagController {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @Get('/')
  public async getTags() {
    const tagAndPosts: ITagAndPostCount[] = await this.tagService.getTagsAndPostCount();

    return {
      status: 200,
      message: '태그 목록 조회를 성공하였습니다.',
      data: {
        tags: tagAndPosts,
      },
    };
  }
}