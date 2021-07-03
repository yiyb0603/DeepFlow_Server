import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class ReplyDto {
  @IsString()
  @IsNotEmpty()
  contents: string;
  
  @IsInt()
  @IsNotEmpty()
  commentIdx: number;

  @IsInt()
  @IsNotEmpty()
  postIdx: number;
}