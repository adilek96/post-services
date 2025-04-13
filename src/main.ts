import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Включаем CORS для доступа с фронтенда
  
  // Указываем порт 4002 и хост 0.0.0.0 для доступа извне
  const port = 4002;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Приложение запущено на http://0.0.0.0:${port}`);
}
bootstrap();
