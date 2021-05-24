import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import HttpError from 'exception/HttpError';
import { createToken } from 'lib/token';
import AuthGuard from 'middleware/auth';
import User from 'modules/user/user.entity';
import UserRepository from 'modules/user/user.repository';
import { RefreshTokenDto } from './dto/token.dto';

@Injectable()
export default class TokenService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async handleRefreshToken(refreshTokenDto: RefreshTokenDto): Promise<string> {
    const { accessToken } = refreshTokenDto;
    const token: User = AuthGuard.validateToken(accessToken, true);
    
    if (token !== null) {
      const { idx, githubId, isAdmin } = token;
      const user: User = await this.userRepository.findByIdx(token.idx);

      if (user === undefined) {
        throw new HttpError(404, '존재하지 않는 유저입니다.');
      }

      const refreshToken: string = createToken(idx, githubId, isAdmin);
      return refreshToken;
    }
  }
}