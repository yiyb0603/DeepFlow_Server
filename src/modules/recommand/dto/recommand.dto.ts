import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class RecommandDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userIdx: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly reason: string;
}