import { IsEmail, IsEnum, IsInt, IsString, Max, MaxLength, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { EMajor } from 'lib/enum/majors';
import { getGenerations } from 'lib/getGenerations';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly githubId: string;

  @IsString()
  @IsNotEmpty()
  readonly avatar: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly description: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly location: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly blog: string;

  @IsInt()
  @IsNotEmpty()
  @Max(getGenerations())
  readonly generation: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly position: string;

  @IsEnum(EMajor)
  @IsNotEmpty()
  readonly major: EMajor;
}

export class GithubCodeDto {
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}

export class ModifyUserDto extends PartialType(UserDto) {}

export class SetFCMDto {
  @IsString()
  @IsNotEmpty()
  fcmToken: string;
}