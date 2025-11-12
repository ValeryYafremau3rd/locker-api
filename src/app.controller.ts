import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService<unknown>,
  ) {}

  @Get()
  getHello(): string {
    return <string>this.configService.get('MODE');
  }
}
