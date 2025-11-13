import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(name: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { name: name } });

    if (!user) {
      throw new NotFoundException(`User ${name} not found.`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async signup(name: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { name: name } });

    if (user) {
      throw new NotFoundException(`User name ${name} is not available.`);
    }
    
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.prisma.user.create({ data: { name, password: hashedPassword } });

    return {
        accessToken: this.jwtService.sign({ userId: newUser.id }),
      };
  }
}
