import { IsInt, IsString } from "class-validator";

export class ReplyDto {
  @IsString()
  contents: string;
  
  @IsInt()
  commentIdx: number;

  @IsInt()
  postIdx: number;
}