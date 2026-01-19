import { Post } from '@/entities/post/post.entity'
import { PostItem } from '@/features/post/post-list/ui/post-item'

interface MainPageProps {
  posts: Post[]
  pinnedPosts: Post[]
}

export const MainPage = async ({ posts, pinnedPosts }: MainPageProps) => {
  return (
    <div className="flex gap-3">
      <section className="flex flex-col gap-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">고정글</h1>
          <p className="font-semibold">더보기</p>
        </div>
        {pinnedPosts.map((post) => (
          <PostItem key={post.postSeq} post={post} />
        ))}

        <div className="flex justify-between">
          <h1 className="text-xl font-bold">최신글</h1>
          <p className="font-semibold">더보기</p>
        </div>
        {posts.map((post) => (
          <PostItem key={post.postSeq} post={post} />
        ))}
      </section>
    </div>
  )
}
