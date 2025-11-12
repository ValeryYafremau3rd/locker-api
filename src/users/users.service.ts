import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; password: string }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}