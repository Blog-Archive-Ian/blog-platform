import type {
  EditUserBody,
  GetUserAccountData,
  GetUserCategoriesData,
  GetUserTagsData,
} from '@blog/contracts';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAccountByBlogId(blogId: string): Promise<GetUserAccountData> {
    const row = await this.prisma.user.findFirst({
      where: { blog_id: blogId },
      select: {
        id: true,
        email: true,
        name: true,
        instagram_id: true,
        intro: true,
        personal_url: true,
        github_id: true,
        profile_image: true,
      },
    });

    if (!row) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    return {
      id: row.id,
      email: row.email!,
      name: row.name,
      instagramId: row.instagram_id ?? '',
      intro: row.intro ?? '',
      personalUrl: row.personal_url ?? '',
      githubId: row.github_id ?? '',
      profileImage: row.profile_image ?? '',
    };
  }

  async updateUser(userId: string, body: EditUserBody): Promise<void> {
    const updated = await this.prisma.user.updateMany({
      where: { id: userId },
      data: {
        name: body.name,
        intro: body.intro,
        instagram_id: body.instagramId,
        github_id: body.githubId,
        personal_url: body.personalUrl,
      },
    });
    if (updated.count === 0)
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
  }

  async updateProfileImage(
    userId: string,
    profileImage: string,
  ): Promise<void> {
    const updated = await this.prisma.user.updateMany({
      where: { id: userId },
      data: { profile_image: profileImage },
    });
    if (updated.count === 0)
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
  }

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
