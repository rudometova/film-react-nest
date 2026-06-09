import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // Выбор логгера через переменную окружения LOG_FORMAT
  const logFormat = process.env.LOG_FORMAT || 'dev';

  switch (logFormat) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
      app.useLogger(new DevLogger());
  }

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public', 'content', 'afisha'), {
    prefix: '/content/afisha/',
  });

  await app.listen(3000);
  console.log(`🚀 Сервер запущен на http://localhost:3000`);
}
bootstrap();