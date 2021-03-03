import { IsNumber } from "class-validator";

export class RecommandDto {
  @IsNumber()
  readonly userIdx: number;
}