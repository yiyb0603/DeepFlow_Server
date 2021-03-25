import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { PostEnums } from 'lib/enum/post';

export class PostDto {
  @IsEnum(PostEnums)
  readonly category: PostEnums;

  @IsString()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @MaxLength(150)
  readonly introduction: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly contents: string;

  @IsArray()
  @ArrayMaxSize(5)
  readonly postTags: string[];

  @IsBoolean()
  readonly isTemp: boolean;
}