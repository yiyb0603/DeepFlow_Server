import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagRepository from './tag.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
  ],
  controllers: [],
  providers: [],
})
export class TagModule {}
