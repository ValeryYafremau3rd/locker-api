import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entity/user.entity';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { BoardEntity } from './entity/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BoardEntity })
  async findAll() {
    return await this.boardService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BoardEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.boardService.findOne(id);
  }

  @Put('create')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BoardEntity })
  async create(@Request() req, @Body() { title }: BoardDto) {
    return this.boardService.create({ title, authorId: req.user.id });
  }
}
