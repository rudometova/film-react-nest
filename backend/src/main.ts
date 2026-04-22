import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';  // ← добавить
import { AppModule } from './app.module';
import { join } from 'path';  // ← добавить
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  // ← добавить тип
  
  // Глобальный префикс для всех API эндпоинтов
  app.setGlobalPrefix("api/afisha");
  
  // Разрешаем CORS (для фронтенда на React)
  app.enableCors();
  
  // Настройка статических файлов (картинки, стили)
  // join(__dirname, '..', 'public') - путь к папке public
  // prefix - URL, по которому будут доступны файлы
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/content/afisha/',
  });
  
  await app.listen(3000);
  console.log(`🚀 Сервер запущен на http://localhost:3000`);
}
bootstrap();