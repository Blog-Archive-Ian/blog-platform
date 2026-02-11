import type {
  GetUserCategoriesResponse,
  GetUserTagsResponse,
} from '@blog/contracts';
import { getUserCategories, getUserTags } from '@blog/contracts';
import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
