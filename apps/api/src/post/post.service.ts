import type { GetPostListQuery, GetPostListResponse } from '@blog/contracts';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PostMapper } from './post.mapper';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: PostMapper,
  ) {}

  async getPostList(
    query: GetPostListQuery,
  ): Promise<GetPostListResponse['data']> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;
    const take = size;

    const where = {
      is_archived: false,
      ...(query.category ? { category: { name: query.category } } : {}),
      ...(query.tag
        ? { post_tag: { some: { tag: { name: query.tag } } } }
        : {}),
    } as const;

    const [totalCount, rows] = await Promise.all([
      this.prisma.post.count({ where }),
      this.prisma.post.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take,
        include: {
          category: true,
          user: true,
        },
      }),
    ]);

    // tags 별도 조회
    const postSeqs = rows.map((r) => r.post_seq);

    const postTags = await this.prisma.post_tag.findMany({
      where: {
        post_seq: { in: postSeqs },
      },
      include: {
        tag: true,
      },
    });

    // post_seq(string) -> tags[]
    const tagMap = new Map<string, string[]>();
    for (const pt of postTags) {
      const key = pt.post_seq.toString();
      const arr = tagMap.get(key) ?? [];
      if (pt.tag?.name) arr.push(pt.tag.name);
      tagMap.set(key, arr);
    }

    const posts = rows.map((row) =>
      this.mapper.toContract(row, tagMap.get(row.post_seq.toString()) ?? []),
    );

    return {
      posts,
      totalCount,
    };
  }
}
