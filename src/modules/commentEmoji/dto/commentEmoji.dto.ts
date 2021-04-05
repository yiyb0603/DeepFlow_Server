import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CommentEmojiDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  readonly emoji: string;

  @IsInt()
  readonly commentIdx: number;
}