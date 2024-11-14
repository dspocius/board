import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { Entries } from './entries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entries])],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
