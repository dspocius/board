import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }
  async delete(id:number): Promise<Object> {
    return this.boardRepository.delete({id: id });
  }
  async create(name: string): Promise<Board> {
    const board = new Board();
    board.name = name;
    return this.boardRepository.save(board);
  }
}
