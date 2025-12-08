import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Request,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TicketDto } from './dto/ticket.dto';
import { StatusEntity } from './entities/status.entity';
import { TicketEntity } from './entities/ticket.entity';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TicketEntity })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() { title, description, assignedToId, statusId, boardId }: TicketDto,
  ) {
    return await this.ticketService.update(id, {
      title,
      description,
      boardId,
      assignedToId,
      statusId,
    });
  }

  @Get('statuses')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: StatusEntity })
  async findStatuses() {
    return await this.ticketService.findStatuses();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TicketEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.ticketService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TicketEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.ticketService.delete(id);
  }

  @Put('create')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TicketEntity })
  async create(
    @Request() req,
    @Body() { title, description, assignedToId, statusId, boardId }: TicketDto,
  ) {
    return this.ticketService.create({
      title,
      description,
      boardId,
      assignedToId: assignedToId || req.user.id,
      statusId,
      authorId: req.user.id,
    });
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TicketEntity })
  async findAll() {
    return await this.ticketService.findAll();
  }
}
