import { PostContent } from '@/shared/components/molecules/post-content'
import { TableOfContents } from '@/shared/components/molecules/toc'
import { usePostDetail } from '@/shared/query-hook/post.query'
import { formatKoreanDate } from '@/shared/utils/format'
import { Badge, Separator } from '@blog/ui'
import { useParams } from '@tanstack/react-router'

export const PostDetailPage = () => {
  const { postSeq } = useParams({ from: '/(auth)/posts/$postSeq' })
  const seq = Number(postSeq)

  const { data: post, isLoading, isError } = usePostDetail({ postSeq: seq })

  if (!Number.isFinite(seq))
    return <div className="mx-auto max-w-200 px-6 py-10">잘못된 게시글 번호입니다.</div>

  if (isLoading) return <div className="mx-auto max-w-200 px-6 py-10">불러오는 중…</div>

  if (isError || !post)
    return <div className="mx-auto max-w-200 px-6 py-10">게시글을 찾을 수 없어요.</div>

  return (
    <div className="relative mx-auto w-full flex">
      {/* 중앙 콘텐츠 */}
      <div className="mx-auto w-full max-w-200" id="post-article">
        <article className="min-w-0 pb-20">
          <p className="text-md lg:text-lg font-semibold text-muted-foreground">{post.category}</p>

          <h1 className="mt-3 text-2xl lg:text-4xl font-semibold tracking-tight">{post.title}</h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="rounded-md px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">{formatKoreanDate(post.createdAt)}</p>

          <Separator className="my-6" />
          <PostContent post={post} />
        </article>
      </div>

      <aside className="hidden 2xl:block">
        <div className="sticky top-24 right-0 w-[320px]">
          <TableOfContents title={post.title} />
        </div>
      </aside>
    </div>
  )
}
