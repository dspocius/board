import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
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
    return (await this.entriesService.findByBoardId(id)).sort((a:any,b:any) => a.position < b.position ? -1 : a.position > b.position ? 1 : 0);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Object> {
    return this.entriesService.delete(id);
  }
  @Delete('/board/:id')
  async deleteBoard(@Param('boardid') boardid: number): Promise<Object> {
    return this.entriesService.deleteBoardEntries(boardid);
  }
  @Put('/:id')
  async edit(@Param('id') id: number, @Body() createEntriesDto: CreateEntryDto): Promise<Object> {
    return this.entriesService.update(id, createEntriesDto.name, createEntriesDto.description, createEntriesDto.board_id, createEntriesDto.position);
  }
  @Post()
  async create(@Body() createEntriesDto: CreateEntryDto): Promise<Entries> {
    return this.entriesService.create(createEntriesDto.name, createEntriesDto.email, createEntriesDto.is_project,
	createEntriesDto.description, createEntriesDto.board_id, createEntriesDto.position);
  }
}
