import { Injectable } from '@nestjs/common';
import { ITagAndPostCount } from 'types/tag.types';
import TagRepository from './tag.repository';

@Injectable()
export default class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) {}
  
  public async getTagsAndPostCount(): Promise<ITagAndPostCount[]> {
    const tags: ITagAndPostCount[] = await this.tagRepository.getTags();
    return tags;
  }
}