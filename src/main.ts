import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Aplicación iniciada en http://localhost:${port}`);
}

bootstrap();
