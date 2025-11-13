import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { name, password }: LoginDto) {
    return this.authService.login(name, password);
  }

  @Put('signup')
  @ApiOkResponse({ type: AuthEntity })
  signup(@Body() { name, password }: SignupDto) {
    return this.authService.signup(name, password);
  }
}