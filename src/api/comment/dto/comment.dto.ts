import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNumber()
  readonly postIdx: number;

  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly userIdx: number;
}