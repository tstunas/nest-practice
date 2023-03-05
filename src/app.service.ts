import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  naverLogin(): string {
    return 'Hello World!';
  }
  
  kakaoLogin(): string {
    return 'Hello World!';
  }
}
