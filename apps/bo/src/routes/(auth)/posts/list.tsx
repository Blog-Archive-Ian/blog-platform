import { PostListPage } from '@/pages/post/post-list-page'
import type { UiPostListQuery } from '@/pages/post/use-filter-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/list')({
  component: PostListPage,
  validateSearch: (params: Partial<UiPostListQuery>): Partial<UiPostListQuery> => {
    return {
      page: params.page ? Math.max(1, params.page) : 1,
      size: params.size ? Math.min(Math.max(1, params.size), 100) : 10,
      category: params.category ?? undefined,
      tag: params.tag ?? undefined,
      archived: params.archived ?? undefined,
      pinned: params.pinned ?? undefined,
    }
  },
})
