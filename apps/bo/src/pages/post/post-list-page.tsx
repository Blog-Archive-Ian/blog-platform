import { useSearchParams } from '@/hooks/use-search-params'
import { Route } from '@/routes/(auth)/posts/list'
import { usePostList } from '@/shared/query-hook/post.query'
import type { GetPostListQuery } from '@blog/contracts'
import { Button } from '@blog/ui'
import { useState } from 'react'
import { PostTable } from './post-table'

export const PostListPage = () => {
  const defaultSearch: GetPostListQuery = {
    page: 1,
    size: 10,
  }

  const { search, applySearch, resetSearch } = useSearchParams<GetPostListQuery>({
    defaultSearch: defaultSearch,
    Route: Route,
  })

  const [filters, setFilters] = useState<GetPostListQuery>({
    ...defaultSearch,
    ...search,
  })

  const { data: postList } = usePostList({ ...defaultSearch, ...search })

  const handleSearch = () => {
    applySearch(filters)
  }

  const handleReset = () => {
    setFilters(defaultSearch)
    resetSearch()
  }

  return (
    <div className="mx-auto w-full max-w-6xl min-w-6xl px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">All Posts</h1>
          <p className="text-sm text-muted-foreground">모든 작성글 확인</p>
        </div>
      </div>
      <div className="w-full border rounded-lg pb-5 p-10 my-10 flex items-end justify-end">
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset}>
            초기화
          </Button>
          <Button onClick={handleSearch}>검색</Button>
        </div>
      </div>
      <PostTable data={postList?.posts} isLoading={!postList} />
    </div>
  )
}
