import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NoticeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly contents: string;
}