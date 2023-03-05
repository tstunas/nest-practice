import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private naverClientId = this.configService.get('NAVER_CLIENT_ID');
  private naverClientSecert = this.configService.get('NAVER_CLIENT_SECRET');
  private naverClientRedirectUri = this.configService.get(
    'NAVER_CLIENT_REDIRECT_URI',
  );

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async naverLogin(code: string, state: string) {
    const response = await lastValueFrom(
      this.httpService.get('https://nid.naver.com/oauth2.0/token', {
        params: {
          grant_type: 'authorization_code',
          client_id: this.naverClientId,
          client_secret: this.naverClientRedirectUri,
          code,
          state,
        },
      }),
    ).catch((err) => {
      throw new InternalServerErrorException({
        message: err.message,
      });
    });
    return response.data;
  }

  kakaoLogin(): string {
    return 'Hello World!';
  }
}
