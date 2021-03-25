import { IsInt, IsString } from "class-validator";

export class CreateReplyDto {
  @IsString()
  contents: string;
  
  @IsInt()
  commentIdx: number;

  @IsInt()
  postIdx: number;
}

export class ModifyReplyDto {
  @IsString()
  contents: string;
}