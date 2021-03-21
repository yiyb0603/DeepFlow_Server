import { IsEnum, IsInt, IsString } from 'class-validator';
import { MajorEnums } from 'lib/enum/majors';

export class SignUpDto {
  @IsString()
  readonly githubId: string;

  @IsString()
  readonly avatar: string;

  @IsString()
  readonly name: string;
  
  @IsString()
  readonly description: string;
  
  @IsString()
  readonly location: string;
  
  @IsString()
  readonly blog: string;

  @IsInt()
  readonly generation: number;

  @IsString()
  readonly position: string;

  @IsEnum(MajorEnums)
  readonly major: MajorEnums;
}

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}