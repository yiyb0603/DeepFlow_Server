import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserRepository from "modules/user/user.repository";
import RecommandController from "./recommand.controller";
import RecommandRepository from "./recommand.repository";
import RecommandService from "./recommand.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecommandRepository,
      UserRepository,
    ])
  ],
  providers: [RecommandService],
  controllers: [RecommandController],
})
export class RecommandModule {}