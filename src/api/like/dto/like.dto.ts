import { IsNumber } from "class-validator";

export class LikeDto {
  @IsNumber()
  postIdx: number;
}