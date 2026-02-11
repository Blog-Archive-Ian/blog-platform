import type {
  EditUserBody,
  EditUserProfileImageBody,
  EditUserProfileImageResponse,
  EditUserResponse,
  GetUserAccountResponse,
  GetUserCategoriesResponse,
  GetUserTagsResponse,
} from '@blog/contracts';
import {
  EditUser,
  EditUserProfileImage,
  GetUserAccount,
  getUserCategories,
  getUserTags,
} from '@blog/contracts';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UserService } from './user.service';

type JwtUser = { sub?: string; userId?: string };

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(GetUserAccount.path)
  async getAccount(
    @Headers('blogid') blogId: string | undefined,
  ): Promise<GetUserAccountResponse> {
    const resolvedBlogId = blogId?.trim();
    if (!resolvedBlogId) {
      throw new BadRequestException({
        status: 400,
        message: 'blogId 헤더가 필요합니다.',
        data: null,
      });
    }

    const data = await this.userService.getAccountByBlogId(resolvedBlogId);

    return {
      status: 200,
      message: '계정 정보가 성공적으로 조회되었습니다.',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(EditUser.path)
  async editUser(
    @Req() req: Request,
    @Body() rawBody: EditUserBody,
  ): Promise<EditUserResponse> {
    const parsed = EditUser.Body.safeParse(rawBody);
    if (!parsed.success) {
      throw new BadRequestException({
        status: 400,
        message: '사용자 정보 수정에 실패했습니다.',
        data: null,
      });
    }

    const user = req.user as JwtUser | undefined;
    const userId = user?.sub ?? user?.userId;
    if (!userId) {
      throw new BadRequestException({
        status: 500,
        message: '유저 정보를 찾을 수 없습니다.',
        data: null,
      });
    }

    await this.userService.updateUser(userId, parsed.data);

    return {
      status: 200,
      message: '사용자 정보가 성공적으로 수정되었습니다.',
      data: null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(EditUserProfileImage.path)
  async editUserProfileImage(
    @Req() req: Request,
    @Body() rawBody: EditUserProfileImageBody,
  ): Promise<EditUserProfileImageResponse> {
    const parsed = EditUserProfileImage.Body.safeParse(rawBody);
    if (!parsed.success) {
      throw new BadRequestException({
        status: 400,
        message: '프로필 이미지 수정에 실패했습니다.',
        data: null,
      });
    }

    const user = req.user as JwtUser | undefined;
    const userId = user?.sub ?? user?.userId;
    if (!userId) {
      throw new BadRequestException({
        status: 500,
        message: '유저 정보를 찾을 수 없습니다.',
        data: null,
      });
    }

    await this.userService.updateProfileImage(userId, parsed.data.profileImage);

    return {
      status: 200,
      message: '프로필 이미지가 성공적으로 수정되었습니다.',
      data: null,
    };
  }

  // 카테고리 조회
  @Get(getUserCategories.path)
  async getCategories(): Promise<GetUserCategoriesResponse> {
    const data = await this.userService.getCategories();
    return {
      status: 200,
      message: '카테고리를 성공적으로 조회했습니다.',
      data,
    };
  }

  // 태그 조회
  @Get(getUserTags.path)
  async getTags(): Promise<GetUserTagsResponse> {
    const data = await this.userService.getTags();
    return {
      status: 200,
      message: '태그를 성공적으로 조회했습니다.',
      data,
    };
  }
}
