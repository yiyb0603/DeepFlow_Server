import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @MaxLength(150)
  readonly introduction: string;

  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @IsString()
  @IsNotEmpty()
  readonly contents: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(5)
  readonly postTags: string[];

  @IsBoolean()
  @IsNotEmpty()
  readonly isTemp: boolean;
}