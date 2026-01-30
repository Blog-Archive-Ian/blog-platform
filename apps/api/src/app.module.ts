import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvSchema } from './config/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const validated = plainToInstance(EnvSchema, config, {
          enableImplicitConversion: true,
        });

        const errors = validateSync(validated, {
          skipMissingProperties: false,
        });

        if (errors.length > 0) {
          throw new Error(
            errors
              .map((e) => Object.values(e.constraints ?? {}).join(', '))
              .join('\n'),
          );
        }

        return validated;
      },
    }),
  ],
})
export class AppModule {}
