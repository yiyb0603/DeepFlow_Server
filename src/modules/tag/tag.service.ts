import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from 'config/config.json';
import { ETagSort } from 'lib/enum/tag';
import PostEntity from 'modules/post/post.entity';
import { ITagAndPostCount } from 'types/tag.types';
import Tag from './tag.entity';
import TagRepository from './tag.repository';

@Injectable()
export default class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) {}
  
  public async getTagsAndPostCount(sort: ETagSort): Promise<ITagAndPostCount[]> {
    const tags: ITagAndPostCount[] = await this.tagRepository.getTags(sort);
    return tags;
  }

  public async getTagsByPostIdx(postIdx: number): Promise<Tag[]> {
    const tags: Tag[] = await this.tagRepository.getTagsByPostIdx(postIdx);
    return tags;
  }

  public async handlePushTags(postTags: string[], post: PostEntity): Promise<void> {
    for (const postTag of postTags) {
      const tag: Tag = new Tag();
      tag.name = postTag;
      tag.post = post;
      tag.description = await this.handleSearchTagKeyword(postTag);

      await this.tagRepository.save(tag);
    }
  }

  public async handleSearchTagKeyword(keyword: string): Promise<string> {
    const SEARCH_URL: string = `https://openapi.naver.com/v1/search/encyc.json?query=${encodeURI(keyword.trim())}&display=1`;

    const { data } = await axios.get(SEARCH_URL, {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });

    let description: string = '';

    if (data.items.length > 0) {
      description = data.items[0].description;
      description = description.replace(/(<([^>]+)>)/ig, '');
    }
    return description;
  }
}