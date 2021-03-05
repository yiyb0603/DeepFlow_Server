import { IsString } from "class-validator";

export class NoticeDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;
}