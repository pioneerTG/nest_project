import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadPath = 'uploads';
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath);
  }

  app.useStaticAssets('/uploads');

  app.useStaticAssets(join(__dirname, '../', 'uploads'), {
    prefix: '/uploads',
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(3001);
}
bootstrap();
