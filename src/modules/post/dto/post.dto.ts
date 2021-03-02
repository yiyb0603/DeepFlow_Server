import { IsArray, IsEnum, IsNumber, IsString, Max } from "class-validator";
import { PostEnums } from "lib/enum/post";

export class PostDto {
  @IsEnum(PostEnums)
  readonly category: PostEnums;

  @IsString()
  @Max(150)
  readonly introduction: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;

  @IsArray()
  readonly postTags: string[];
}