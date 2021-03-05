import { IsNumber, IsString, MaxLength } from "class-validator";

export class CommentDto {
  @IsNumber()
  readonly postIdx: number;

  @IsString()
  @MaxLength(255)
  readonly contents: string;
}