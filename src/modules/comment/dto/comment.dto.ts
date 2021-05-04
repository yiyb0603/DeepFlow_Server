import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly postIdx: number;

  @IsString()
  @IsNotEmpty()
  readonly contents: string;
}