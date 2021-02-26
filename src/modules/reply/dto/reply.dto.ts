import { IsNumber, IsString } from "class-validator";

export class CreateReplyDto {
  @IsString()
  contents: string;
  
  @IsNumber()
  commentIdx: number;

  @IsNumber()
  postIdx: number;
}

export class ModifyReplyDto {
  @IsString()
  contents: string;
}