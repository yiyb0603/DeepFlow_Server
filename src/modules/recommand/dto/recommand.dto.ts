import { IsString } from "class-validator";

export class RecommandDto {
  @IsString()
  readonly userId: string;
}