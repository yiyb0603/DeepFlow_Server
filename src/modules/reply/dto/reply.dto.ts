import { IsNumber, IsString, MaxLength } from "class-validator";

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
  @MaxLength(255)
  contents: string;
}