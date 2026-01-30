import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class EnvSchema {
  // ===== App =====
  @IsNumber()
  @Transform(({ value }) => Number(value))
  PORT: number;

  @IsEnum(['development', 'production', 'test'])
  NODE_ENV: 'development' | 'production' | 'test';

  // ===== DB =====
  @IsString()
  DB_IP: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  // ===== Auth =====
  @IsString()
  JWT_SECRET_KEY: string;

  // ===== CORS =====
  @IsString()
  FRONT_URL: string;

  // ===== Prisma =====
  @IsString()
  DATABASE_URL: string;
}
