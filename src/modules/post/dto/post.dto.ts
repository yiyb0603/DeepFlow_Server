import { ArrayMaxSize, IsArray, IsBoolean, IsString, MaxLength } from 'class-validator';

export class PostDto {
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