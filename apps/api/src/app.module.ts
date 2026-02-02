import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from './config/validate-env';
import { HealthModule } from './health/health.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: ['apps/api/.env', '.env'],
    }),
    PrismaModule,
    HealthModule,
    PostModule,
  ],
})
export class AppModule {}
