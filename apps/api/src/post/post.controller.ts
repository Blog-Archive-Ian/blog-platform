import type {
  ArchivePostResponse,
  GetFilteredPostListResponse,
  UnArchivePostResponse,
} from '@blog/contracts';
import {
  ArchivePost,
  GetFilteredPostList,
  UnArchivePost,
} from '@blog/contracts';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  // 글 목록 조회
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

  // 글 보관
  @Post(ArchivePost.path(':postSeq'))
  async archivePost(
    @Param() rawParams: Record<string, unknown>,
  ): Promise<ArchivePostResponse> {
    const parsed = ArchivePost.Params.safeParse({
      postSeq: Number(rawParams.postSeq),
    });

    if (!parsed.success) {
      throw new BadRequestException({
        message: '게시글 보관에 실패했습니다.',
        status: 500,
        data: null,
      });
    }

    await this.postService.archivePost(parsed.data);

    return {
      status: 200,
      message: '게시글이 성공적으로 보관되었습니다.',
      data: null,
    };
  }

  // 글 보관 해제
  @Post(UnArchivePost.path(':postSeq'))
  async unarchivePost(
    @Param() rawParams: Record<string, unknown>,
  ): Promise<UnArchivePostResponse> {
    const parsed = UnArchivePost.Params.safeParse({
      postSeq: Number(rawParams.postSeq),
    });

    if (!parsed.success) {
      throw new BadRequestException({
        message: '게시글 보관 해제에 실패했습니다.',
        status: 500,
        data: null,
      });
    }

    await this.postService.unarchivePost(parsed.data);

    return {
      status: 200,
      message: '게시글이 성공적으로 보관 해제되었습니다.',
      data: null,
    };
  }
}
