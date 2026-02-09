import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

const cookieExtractor = (req: Request) => req?.cookies?.accessToken;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.JWT_SECRET_KEY!,
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, blogId: payload.blogId, name: payload.name };
  }
}
