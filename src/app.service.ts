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
  private kakaoClientId = this.configService.get('KAKAO_CLIENT_ID');
  private kakaoClientRedirectUri = this.configService.get(
    'KAKAO_CLIENT_REDIRECT_URI',
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
          client_secret: this.naverClientSecert,
          code,
          state,
        },
      }),
    ).catch((err) => {
      throw new InternalServerErrorException({
        message: err.message,
      });
    });
    response.data; // access_token

    const authHeader = `Bearer ${response.data?.access_token}`;

    await lastValueFrom(
      this.httpService.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: authHeader,
        },
      }),
    )
      .then((res) => {
        console.log(res.data.response);
        const { nickname, email, name } = res.data.response;
      })
      .catch((err) => {
        console.error(err);
      });

    return response.data;
  }

  async kakaoLogin(code: string) {
    const response = await lastValueFrom(
      this.httpService.post('https://kauth.kakao.com/oauth/token', {
        params: {
          grant_type: 'authorization_code',
          client_id: this.kakaoClientId,
          redirect_uri: this.kakaoClientRedirectUri,
          code,
        },
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }),
    ).catch((err) => {
      throw new InternalServerErrorException({
        message: err.message,
      });
    });
    console.log(response.data)
    return response.data;
  }
}
