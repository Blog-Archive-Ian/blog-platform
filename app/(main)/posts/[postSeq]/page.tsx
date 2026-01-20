import { notFound } from 'next/navigation'

import { getPostDetail } from '@/entities/post/post.api'
import { PostSeq } from '@/entities/post/post.entity'
import { PostContent } from '@/features/post/post-detail/ui/post-content'
import { TableOfContents } from '@/features/post/post-detail/ui/toc'
import { formatKoreanDate } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/atoms/badge'
import { Separator } from '@/shared/ui/atoms/separator'

export default async function PostPage({ params }: { params: Promise<PostSeq> }) {
  const { postSeq } = await params
  const post = await getPostDetail({ postSeq: postSeq })

  if (!post || !postSeq) notFound()

  return (
    <div className="relative mx-auto flex w-full max-w-7xl gap-12">
      <article className="min-w-0 flex-1 pb-20">
        <p className="text-md lg:text-lg font-semibold text-muted-foreground">{post.category}</p>
        <h1 className="mt-3 text-2xl lg:text-4xl font-semibold tracking-tight">{post.title}</h1>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-md px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{formatKoreanDate(post.createdAt)}</p>
        <Separator className="mt-6" />
        <div className="mt-10">
          <PostContent post={post} />
        </div>
      </article>

      <aside className="hidden xl:block">
        <TableOfContents title={post.title} />
      </aside>
    </div>
  )
}
