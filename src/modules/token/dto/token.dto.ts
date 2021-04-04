import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  readonly accessToken: string;
}