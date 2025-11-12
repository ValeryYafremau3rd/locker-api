import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private configService: ConfigService<unknown>,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    //this.userService.createUser({name: 'user', password: 'password'})
    const users = await this.userService.findAllUsers()
    return <string>this.configService.get('MODE') + JSON.stringify(users);
  }
}
