import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import AuthGuard from 'middleware/auth';
import { RefreshTokenDto } from './dto/token.dto';
import TokenService from './token.service';

@Controller('/token')
export default class TokenController {
  constructor(
    private readonly tokenService: TokenService,
  ) {}

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleRefreshToken(
    @Body() refreshTokenDto: RefreshTokenDto, 
  ) {
    const refreshToken: string = await this.tokenService.handleRefreshToken(refreshTokenDto);

    return {
      status: 200,
      message: '리프레쉬 토큰을 발급하였습니다.',
      data: {
        refreshToken,
      },
    };
  }
}