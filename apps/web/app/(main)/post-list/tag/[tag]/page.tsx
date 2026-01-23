import { PostItem } from '@/features/post/post-list/ui/post-item'
import { PostPagination } from '@/features/post/post-list/ui/post-pagination'
import { getPostList } from '@/shared/api/post.api'
import { PaginationQuery } from '@blog/contracts'

export default async function PostListPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>
  searchParams: Promise<PaginationQuery>
}) {
  const tag = (await params).tag
  const page = Number((await searchParams).page ?? 1)
  const size = Number((await searchParams).size ?? 5)

  const posts = await getPostList({ tag: decodeURIComponent(tag), page, size })
  const totalPages = Math.ceil(posts.totalCount / size)

  return (
    <div className="max-w-250 flex flex-col gap-10">
      <h1 className="text-xl font-bold">{decodeURIComponent(tag)} 태그의 최신글</h1>
      {posts.posts.map((post) => (
        <PostItem key={post.postSeq} post={post} />
      ))}
      <PostPagination page={page} size={size} totalPages={totalPages} />
    </div>
  )
}
