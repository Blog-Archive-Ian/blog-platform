import type { PostType } from '@blog/contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMapper {
  toContract(row: any, tags: string[]): PostType {
    return {
      postSeq: Number(row.post_seq),
      title: row.title,
      content: row.content ?? '',
      category: row.category?.name ?? '',
      tags,
      createdAt: (row.created_at ?? new Date()).toISOString(),
      authorName: row.user?.name ?? 'unknown',
      views: row.views ?? 0,
      pinned: !!row.is_pinned,
      archived: !!row.is_archived,
    };
  }
}
