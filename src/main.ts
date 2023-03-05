import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: readFileSync('/etc/letsencrypt/archive/www.sparta-tstunas.shop/privkey1.pem'),
      cert: readFileSync('/etc/letsencrypt/archive/www.sparta-tstunas.shop/cert1.pem'), 
    },
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  await app.listen(443);
}
bootstrap();
