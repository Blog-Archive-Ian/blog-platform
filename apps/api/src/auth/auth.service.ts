import type { LoginBody } from '@blog/contracts';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(body: LoginBody) {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user?.password) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const ok = await bcrypt.compare(body.password, user.password);
    if (!ok) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      blogId: user.blog_id,
      name: user.name,
    });

    return { accessToken };
  }
}
