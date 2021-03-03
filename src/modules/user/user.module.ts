import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecommandRepository from 'modules/recommand/recommand.repository';
import UserController from './user.controller';
import UserRepository from './user.repository';
import UserService from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RecommandRepository,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
