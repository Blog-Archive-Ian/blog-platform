import { PostDetailPage } from '@/pages/post/post-detail-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/$postSeq')({
  component: PostDetailPage,
})
