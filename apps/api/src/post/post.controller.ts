import type { GetFilteredPostListResponse } from '@blog/contracts';
import { GetFilteredPostList } from '@blog/contracts';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(GetFilteredPostList.path)
  async getFilteredPostList(
    @Query() rawQuery: Record<string, unknown>,
  ): Promise<GetFilteredPostListResponse> {
    const parsed = GetFilteredPostList.Query.safeParse(rawQuery);

    if (!parsed.success) {
      throw new BadRequestException({
        message: '게시글 조회에 실패했습니다.',
        status: 500,
        data: null,
      });
    }

    const data = await this.postService.getPostList(parsed.data);

    return {
      status: 200,
      message: '게시글이 성공적으로 조회되었습니다.',
      data,
    };
  }
}
