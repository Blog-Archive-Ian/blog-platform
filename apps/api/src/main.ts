import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const origins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:5173',
    config.get<string>('FRONT_URL'),
  ].filter(Boolean) as string[];

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  await app.listen(config.get<number>('PORT') ?? 4000);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});
