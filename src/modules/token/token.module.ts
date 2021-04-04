import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from 'modules/user/user.repository';
import TokenController from './token.controller';
import TokenService from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {

}