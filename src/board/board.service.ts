import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Board } from '@prisma/client';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; authorId: number }): Promise<Board> {
    return this.prisma.board.create({
      data,
    });
  }

  async findAll(): Promise<Board[]> {
    return this.prisma.board.findMany();
  }

  async findOne(id: number): Promise<Board | null> {
    return this.prisma.board.findUnique({
      where: {
        id,
      },
    });
  }
}
