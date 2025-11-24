import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Ticket } from '@prisma/client';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    authorId: number;
    boardId: number;
    description: string;
  }): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: { ...data, statusId: 1, assignedToId: data.authorId },
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      boardId?: number;
      description?: string;
      statusId?: number;
      assignedToId?: number;
    },
  ): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      include: {
        status: true,
        board: true,
      },
    });
  }

  async findOne(id: number): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        status: true,
        board: true,
      },
    });
  }

  async delete(id: number): Promise<Ticket | null> {
    return await this.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}
