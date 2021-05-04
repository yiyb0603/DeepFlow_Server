import { IsInt, IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class CommentEmojiDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1)
  readonly emoji: string;

  @IsInt()
  @IsNotEmpty()
  readonly commentIdx: number;
}