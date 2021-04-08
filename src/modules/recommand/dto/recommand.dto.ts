import { IsNumber, IsString, MaxLength } from "class-validator";

export class RecommandDto {
  @IsNumber()
  readonly userIdx: number;

  @IsString()
  @MaxLength(255)
  readonly reason: string;
}