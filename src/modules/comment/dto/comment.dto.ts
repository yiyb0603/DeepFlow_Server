import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsInt()
  @IsNotEmpty()
  readonly postIdx: number;

  @IsString()
  @IsNotEmpty()
  readonly contents: string;
}