import { PostItem } from '@/section/post/post-list/post-item'
import { PostPagination } from '@/section/post/post-list/post-pagination'
import { getPostList } from '@/shared/api/post.api'
import type { PaginationQuery } from '@blog/contracts'
import { redirect } from 'next/navigation'

export default async function PostListPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<PaginationQuery>
}) {
  const category = decodeURIComponent((await params).category)
  const sp = await searchParams

  const pageRaw = Number(sp.page ?? 1)
  const sizeRaw = Number(sp.size ?? 5)

  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? pageRaw : 1
  const size = Number.isFinite(sizeRaw) && sizeRaw >= 1 && sizeRaw <= 100 ? sizeRaw : 5

  const posts = await getPostList({ category, page, size, archived: false })
  const totalPages = posts.totalCount > 0 ? Math.ceil(posts.totalCount / size) : 0

  if (posts.totalCount > 0 && page > totalPages) {
    redirect(`/post-list/category/${encodeURIComponent(category)}?page=${totalPages}&size=${size}`)
  }

  return (
    <div className="max-w-250 flex flex-col gap-10">
      <h1 className="text-xl font-bold">{decodeURIComponent(category)} 카테고리의 최신글</h1>

      {posts.posts.length === 0 ? (
        <div className="rounded-md border bg-muted/30 p-6 text-sm text-muted-foreground">
          게시글이 없습니다.
        </div>
      ) : (
        posts.posts.map((post) => <PostItem key={post.postSeq} post={post} />)
      )}

      {totalPages > 1 && <PostPagination page={page} size={size} totalPages={totalPages} />}
    </div>
  )
}
