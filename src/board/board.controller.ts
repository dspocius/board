import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Post()
  async create(@Body() createBoardDto: { name: string }): Promise<Board> {
    return this.boardService.create(createBoardDto.name);
  }
}
