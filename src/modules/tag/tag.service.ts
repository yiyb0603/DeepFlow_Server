import { Injectable } from "@nestjs/common";
import { ITagAndPostCount } from "types/tag.types";
import Tag from "./tag.entity";
import TagRepository from "./tag.repository";

@Injectable()
export default class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) {}
  
  public async getTagsAndPostCount(): Promise<ITagAndPostCount[]> {
    const tags: Tag[] = await this.tagRepository.getTags();
    let tagsAndPostCount: ITagAndPostCount[] = [];

    for (const tag of tags) {
      const pushedTag: ITagAndPostCount = tagsAndPostCount.find((tagCount) => tagCount.name === tag.name);

      if (pushedTag !== undefined) {
        pushedTag.postCount += 1;
      } else {
        tagsAndPostCount.push({
          name: tag.name,
          postCount: 1,
        });
      }
    }

    return tagsAndPostCount;
  }
}