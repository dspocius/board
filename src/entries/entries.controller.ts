import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { Entries } from './entries.entity';
import { CreateEntryDto } from './createEntryDto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  async findAll(): Promise<Entries[]> {
    return this.entriesService.findAll();
  }

  @Get(':id')
  async findByBoardId(@Param('id') id: number): Promise<Entries[]> {
    return this.entriesService.findByBoardId(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Object> {
    return this.entriesService.delete(id);
  }
  @Delete('/board/:id')
  async deleteBoard(@Param('boardid') boardid: number): Promise<Object> {
    return this.entriesService.deleteBoardEntries(boardid);
  }

  @Post()
  async create(@Body() createEntriesDto: CreateEntryDto): Promise<Entries> {
    return this.entriesService.create(createEntriesDto.name, createEntriesDto.email, createEntriesDto.is_project,
	createEntriesDto.description, createEntriesDto.board_id);
  }
}
