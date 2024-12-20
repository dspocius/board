import { Controller, Get, Post, Body,Delete,Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './createBoardDto';

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Object> {
    return this.boardService.delete(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Edit board' })
  async edit(@Param('id') id: number, @Body() createBoardDto: CreateBoardDto): Promise<Object> {
    return this.boardService.update(id, createBoardDto.name);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto.name);
  }
}
