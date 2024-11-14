import { Controller, Get, Post, Body } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { Entries } from './entries.entity';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  async findAll(): Promise<Entries[]> {
    return this.entriesService.findAll();
  }

  @Post()
  async create(@Body() createEntriesDto: { name: string; email: string;
  is_project: number; description: string; board_id: number }): Promise<Entries> {
    return this.entriesService.create(createEntriesDto.name, createEntriesDto.email, createEntriesDto.is_project,
	createEntriesDto.description, createEntriesDto.board_id);
  }
}
