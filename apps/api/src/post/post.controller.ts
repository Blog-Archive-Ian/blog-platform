import type { GetPostListQuery, GetPostListResponse } from '@blog/contracts';
import { GetPostList } from '@blog/contracts';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(GetPostList.path)
  async getPostList(
    @Query() rawQuery: Record<string, unknown>,
  ): Promise<GetPostListResponse> {
    const parsed = GetPostList.Query.safeParse(rawQuery);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const data = await this.postService.getPostList(
      parsed.data as GetPostListQuery,
    );

    return {
      status: 200,
      message: '게시글이 성공적으로 조회되었습니다.',
      data,
    };
  }
}
