import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entries } from './entries.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entries)
    private entriesRepository: Repository<Entries>,
  ) {}

  async findAll(): Promise<Entries[]> {
    return this.entriesRepository.find();
  }
  async findByBoardId(board_id:number): Promise<Entries[]> {
    return this.entriesRepository.findBy({board_id: board_id });
  }
  async delete(id:number): Promise<Object> {
    return this.entriesRepository.delete({id: id });
  }
  async deleteBoardEntries(id:number): Promise<Object> {
    return this.entriesRepository.delete({board_id: id });
  }
  async update(id:number, name: string, description: string): Promise<Object> {
    return this.entriesRepository.update(id, {name: name, description: description});
  }
  async create(name: string,email: string,is_project: number, description: string, board_id:number): Promise<Entries> {
    const entries = new Entries();
    entries.name = name;
    entries.email = email;
    entries.is_project = is_project;
    entries.description = description;
    entries.board_id = board_id;
    return this.entriesRepository.save(entries);
  }
}
