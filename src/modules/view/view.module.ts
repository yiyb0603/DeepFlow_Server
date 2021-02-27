import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ViewRepository from "./view.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ViewRepository])],
  providers: [],
  controllers: [],
})
export class ViewModule {}