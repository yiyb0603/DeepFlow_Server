import { IsEnum, IsInt, IsObject, IsString } from "class-validator";
import { MajorEnums } from "lib/enum/majors";
import { IGithubUserTypes } from "types/user.types";

export class SignUpDto {
  @IsObject()
  readonly githubInfo: IGithubUserTypes;

  @IsInt()
  readonly generation: number;

  @IsEnum(MajorEnums)
  readonly major: MajorEnums;
}

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}