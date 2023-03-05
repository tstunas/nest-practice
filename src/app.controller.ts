import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('naver')
  naverLogin(): string {
    return this.appService.naverLogin();
  }
  
  @Post('kakao')
  kakaoLogin(): string {
    return this.appService.kakaoLogin();
  }
}
