import { IsEmail, IsEnum, IsInt, IsString, Max, MaxLength } from 'class-validator';
import { MajorEnums } from 'lib/enum/majors';
import { getGenerations } from 'lib/getGenerations';

export class SignUpDto {
  @IsString()
  readonly githubId: string;

  @IsString()
  readonly avatar: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;
  
  @IsString()
  @MaxLength(100)
  readonly description: string;
  
  @IsString()
  @MaxLength(50)
  readonly location: string;
  
  @IsString()
  @MaxLength(100)
  readonly blog: string;

  @IsInt()
  @Max(getGenerations())
  readonly generation: number;

  @IsString()
  @MaxLength(50)
  readonly position: string;

  @IsEnum(MajorEnums)
  readonly major: MajorEnums;
}

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}