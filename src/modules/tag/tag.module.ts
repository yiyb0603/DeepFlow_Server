import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagController from './tag.controller';
import TagRepository from './tag.repository';
import TagService from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TagRepository,
    ]),
  ],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
