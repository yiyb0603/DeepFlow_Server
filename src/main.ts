import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import getProcessEnv from 'lib/getProcessEnv';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: true,
    },
  });

  app.setGlobalPrefix('/api');
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