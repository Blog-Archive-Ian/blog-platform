import type { GetUserCategoriesData, GetUserTagsData } from '@blog/contracts';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<GetUserCategoriesData> {
    const rows = await this.prisma.category.findMany({
      select: {
        category_id: true,
        name: true,
        _count: { select: { post: true } },
      },
      orderBy: { category_id: 'asc' },
    });

    return rows.map((r) => ({
      categoryId: Number(r.category_id),
      name: r.name ?? '미분류',
      postCount: r._count.post,
    }));
  }

  async getTags(): Promise<GetUserTagsData> {
    const rows = await this.prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { post_tag: true } },
      },
      orderBy: { id: 'asc' },
    });

    return rows.map((r) => ({
      tagId: Number(r.id),
      name: r.name,
      postCount: r._count.post_tag,
    }));
  }
}
