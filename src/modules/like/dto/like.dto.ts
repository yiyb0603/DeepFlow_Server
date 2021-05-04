import { IsNumber, IsNotEmpty } from 'class-validator';

export class LikeDto {
  @IsNumber()
  @IsNotEmpty()
  postIdx: number;
}