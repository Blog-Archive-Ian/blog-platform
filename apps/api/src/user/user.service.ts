import type { GetUserCategoriesData, GetUserTagsData } from '@blog/contracts';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<GetUserCategoriesData> {
    const userId: string | null = null;

    const rows = await this.prisma.category.findMany({
      where: {
        ...(userId ? { user_id: userId } : {}),
      },
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
    const userId: string | null = null;

    const rows = await this.prisma.tag.findMany({
      where: {
        ...(userId ? { user_id: userId } : {}),
      },
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
