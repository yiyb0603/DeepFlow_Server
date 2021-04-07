import { IsNumber, IsString } from "class-validator";

export class RecommandDto {
  @IsNumber()
  readonly userIdx: number;

  @IsString()
  readonly reason: string;
}