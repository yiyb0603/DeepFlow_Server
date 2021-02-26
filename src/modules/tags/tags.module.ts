import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagsRepository from './tags.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagsRepository]),
  ],
  controllers: [],
  providers: [],
})
export class TagsModule {}
