import { IsNumber, IsObject, IsString } from "class-validator";
import { MajorEnums } from "lib/enum/majors";
import { IGithubUserTypes } from "types/user.types";

export class SignUpDto {
  @IsObject()
  readonly githubInfo: IGithubUserTypes;

  @IsNumber()
  readonly generation: number;

  @IsNumber()
  readonly major: MajorEnums;
}

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}