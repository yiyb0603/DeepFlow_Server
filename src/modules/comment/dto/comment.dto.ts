import { IsNumber, IsString } from "class-validator";

export class CommentDto {
  @IsNumber()
  readonly postIdx: number;

  @IsString()
  readonly contents: string;
}