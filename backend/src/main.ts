import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Глобальный префикс для API
  app.setGlobalPrefix("api/afisha");
  
  // Разрешаем CORS
  app.enableCors();
  
  // Статика - указываем правильный путь к папке с картинками
  // Картинки лежат в public/content/afisha/
  app.useStaticAssets(join(__dirname, '..', 'public', 'content', 'afisha'), {
    prefix: '/content/afisha/',
  });
  
  await app.listen(3000);
  console.log(`🚀 Сервер запущен на http://localhost:3000`);
}
bootstrap();