import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvSchema } from './env.schema';

export function validateEnv(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, { skipMissingProperties: false });

  if (errors.length) {
    const messages = errors
      .flatMap((e) => Object.values(e.constraints ?? {}))
      .join('\n');
    throw new Error(`환경변수 검증 실패:\n${messages}`);
  }

  return validated;
}
