import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Request,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from './entity/user.entity';
  
  @Controller('users')
  @ApiTags('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {} 
    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity })
    async me(@Request() req) {
      console.log(req.user)
      return await this.usersService.findOne(req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.usersService.findOne(id);
    }
}