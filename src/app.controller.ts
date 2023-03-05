import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('naver')
  naverLogin(@Body('code') code: string, @Body('state') state: string) {
    return this.appService.naverLogin(code, state);
  }
  
  @Post('kakao')
  kakaoLogin(): string {
    return this.appService.kakaoLogin();
  }
}
