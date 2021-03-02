import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as requestIp from 'request-ip';
import * as express from 'express';
import getProcessEnv from 'lib/getProcessEnv';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const bootstrap = async (): Promise<void> => {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      preflightContinue: true,
    },
  });

  app.use(requestIp.mw());
  app.use('/public', express.static(join(__dirname, '../public')));
  
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: '*',
  });

  const PORT: number = Number(getProcessEnv('SERVER_PORT')) || 8080;
  await app.listen(PORT)
  .then(() => console.log(`this server running on ${PORT}`))
  .catch((error) => console.log(error));
}

bootstrap();