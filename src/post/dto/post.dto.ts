import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { PostEnums } from "lib/enum/post";

export class CreatePostDto {
  @IsNumber()
  readonly userIdx: number;

  @IsEnum(PostEnums)
  readonly category: PostEnums;

  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;

  @IsArray()
  readonly postTags: string[];
}