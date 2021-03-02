import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';
import RecommandController from './recommand.controller';
import RecommandRepository from './recommand.repository';
import RecommandService from './recommand.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecommandRepository,
      UserRepository,
    ])
  ],
  providers: [RecommandService, UserService],
  controllers: [RecommandController],
})
export class RecommandModule {}