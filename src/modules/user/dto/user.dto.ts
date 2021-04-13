import { IsEmail, IsEnum, IsInt, IsString, Max, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
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
  @MaxLength(50)
  readonly description: string;
  
  @IsString()
  @MaxLength(100)
  readonly location: string;
  
  @IsString()
  @MaxLength(100)
  readonly blog: string;

  @IsInt()
  @Max(getGenerations())
  readonly generation: number;

  @IsString()
  @MaxLength(100)
  readonly position: string;

  @IsEnum(EMajor)
  readonly major: EMajor;
}

export class GithubCodeDto {
  @IsString()
  readonly code: string;
}

export class ModifyUserDto extends PartialType(UserDto) {}