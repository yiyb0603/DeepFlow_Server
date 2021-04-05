import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { EMajor } from 'lib/enum/majors';
import { getGenerations } from 'lib/getGenerations';

export class UserDto {
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

  @IsEnum(EMajor)
  readonly major: EMajor;
}

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}

export class ModifyUserDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly blog: string;

  @IsOptional()
  @IsString()
  readonly position: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly location: string;
}