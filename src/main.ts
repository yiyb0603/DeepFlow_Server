import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as requestIp from 'request-ip';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccount.json';
import getProcessEnv from 'lib/getProcessEnv';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      preflightContinue: true,
    },
  });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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