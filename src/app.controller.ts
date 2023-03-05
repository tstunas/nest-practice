import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'hello';
  }

  @Post('naver')
  async naverLogin(@Body('code') code: string, @Body('state') state: string) {
    return await this.appService.naverLogin(code, state);
  }

  @Post('kakao')
  kakaoLogin(): string {
    return this.appService.kakaoLogin();
  }
}
