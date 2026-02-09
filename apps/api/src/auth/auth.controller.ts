import { AuthCheck, AuthCheckResponse, Login } from '@blog/contracts';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 로그인
  @Post(Login.path)
  async login(
    @Body() rawBody: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const parsed = Login.Body.safeParse(rawBody);
    if (!parsed.success) {
      throw new BadRequestException({
        status: 500,
        message: '로그인에 실패했습니다.',
        data: null,
      });
    }

    const { accessToken } = await this.authService.login(parsed.data);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    });

    return { status: 200, message: '로그인 성공', data: null };
  }

  // 인증 상태 확인
  @UseGuards(JwtAuthGuard)
  @Get(AuthCheck.path)
  authCheck(): AuthCheckResponse {
    return {
      status: 200,
      message: '유효한 토큰입니다.',
      data: null,
    };
  }
}
